#!/usr/bin/env bash
# Docker disk usage report for the Michishirube API gateway.
# Usage: scripts/docker-stats.sh [--top N] [--warn PERCENT] [--critical PERCENT]
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${REPO_ROOT}"

TOP_N="${DOCKER_STATS_TOP:-10}"
WARN_PCT="${DOCKER_STATS_WARN:-75}"
CRIT_PCT="${DOCKER_STATS_CRITICAL:-90}"
IMAGE_FILTER="${DOCKER_STATS_IMAGE_FILTER:-michishirube}"
DOCKER_ROOT_FALLBACK="/var/lib/docker"

usage() {
  cat <<EOF
Usage: $(basename "$0") [--top N] [--warn PERCENT] [--critical PERCENT] [--filter NAME]

Prints Docker disk usage, largest images, ${IMAGE_FILTER} images, build cache,
volumes, running containers and disk usage warnings.

Env overrides: DOCKER_STATS_TOP, DOCKER_STATS_WARN, DOCKER_STATS_CRITICAL,
               DOCKER_STATS_IMAGE_FILTER
EOF
}

while [ $# -gt 0 ]; do
  case "$1" in
    --top)      TOP_N="${2:-}"; shift 2 ;;
    --warn)     WARN_PCT="${2:-}"; shift 2 ;;
    --critical) CRIT_PCT="${2:-}"; shift 2 ;;
    --filter)   IMAGE_FILTER="${2:-}"; shift 2 ;;
    -h|--help)  usage; exit 0 ;;
    *) printf 'Unknown argument: %s\n\n' "$1" >&2; usage >&2; exit 2 ;;
  esac
done

is_uint() { [[ "${1:-}" =~ ^[0-9]+$ ]]; }

for v in TOP_N WARN_PCT CRIT_PCT; do
  if ! is_uint "${!v}"; then
    printf 'Invalid numeric value for %s: %q\n' "$v" "${!v}" >&2
    exit 2
  fi
done

if [ -t 1 ]; then
  BOLD=$'\033[1m'; YELLOW=$'\033[33m'; RED=$'\033[31m'; GREEN=$'\033[32m'; DIM=$'\033[2m'; RESET=$'\033[0m'
else
  BOLD=''; YELLOW=''; RED=''; GREEN=''; DIM=''; RESET=''
fi

WARNINGS=0

section() { printf '\n%s== %s ==%s\n' "${BOLD}" "$1" "${RESET}"; }
note()    { printf '%s%s%s\n' "${DIM}" "$1" "${RESET}"; }
warn()    { WARNINGS=$((WARNINGS + 1)); printf '%sWARNING:%s %s\n' "${YELLOW}" "${RESET}" "$1"; }
crit()    { WARNINGS=$((WARNINGS + 1)); printf '%sCRITICAL:%s %s\n' "${RED}" "${RESET}" "$1"; }
ok()      { printf '%sOK:%s %s\n' "${GREEN}" "${RESET}" "$1"; }

# Run a command, print its output; on failure print a note instead of aborting.
try_run() {
  local label="$1"; shift
  local out rc=0
  out="$("$@" 2>&1)" || rc=$?
  if [ "$rc" -ne 0 ]; then
    note "(${label} unavailable: exit ${rc}${out:+ - ${out%%$'\n'*}})"
    return 0
  fi
  if [ -z "$out" ]; then
    note "(none)"
  else
    printf '%s\n' "$out"
  fi
}

# Parse a docker size string (e.g. 1.2GB, 512MB, 0B) into bytes.
size_to_bytes() {
  local s="${1:-0B}" num unit
  s="${s// /}"
  num="${s%%[a-zA-Z]*}"
  unit="${s#"$num"}"
  [[ "$num" =~ ^[0-9]+(\.[0-9]+)?$ ]] || { printf '0'; return 0; }
  case "${unit^^}" in
    B|'')  awk -v n="$num" 'BEGIN{printf "%.0f", n}' ;;
    KB|K)  awk -v n="$num" 'BEGIN{printf "%.0f", n*1000}' ;;
    MB|M)  awk -v n="$num" 'BEGIN{printf "%.0f", n*1000*1000}' ;;
    GB|G)  awk -v n="$num" 'BEGIN{printf "%.0f", n*1000*1000*1000}' ;;
    TB|T)  awk -v n="$num" 'BEGIN{printf "%.0f", n*1000*1000*1000*1000}' ;;
    KIB)   awk -v n="$num" 'BEGIN{printf "%.0f", n*1024}' ;;
    MIB)   awk -v n="$num" 'BEGIN{printf "%.0f", n*1024*1024}' ;;
    GIB)   awk -v n="$num" 'BEGIN{printf "%.0f", n*1024*1024*1024}' ;;
    TIB)   awk -v n="$num" 'BEGIN{printf "%.0f", n*1024*1024*1024*1024}' ;;
    *)     printf '0' ;;
  esac
}

printf '%sMichishirube Docker Stats%s  %s(%s)%s\n' "${BOLD}" "${RESET}" "${DIM}" "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" "${RESET}"
note "repo: ${REPO_ROOT}"

if ! command -v docker >/dev/null 2>&1; then
  printf '%sdocker CLI not found in PATH.%s\n' "${RED}" "${RESET}" >&2
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  printf '%sDocker daemon is not reachable (is it running / do you have permission?).%s\n' "${RED}" "${RESET}" >&2
  exit 1
fi

DOCKER_ROOT="$(docker info --format '{{.DockerRootDir}}' 2>/dev/null || true)"
[ -n "${DOCKER_ROOT}" ] || DOCKER_ROOT="${DOCKER_ROOT_FALLBACK}"

section "Docker system df"
try_run "docker system df" docker system df

section "Largest images (top ${TOP_N})"
{
  images="$(docker image ls --format '{{.Size}}\t{{.Repository}}:{{.Tag}}\t{{.ID}}' 2>/dev/null || true)"
  if [ -z "$images" ]; then
    note "(no images)"
  else
    printf 'BYTES\tSIZE\tIMAGE\tID\n'
    while IFS=$'\t' read -r size name id; do
      [ -n "$size" ] || continue
      printf '%s\t%s\t%s\t%s\n' "$(size_to_bytes "$size")" "$size" "$name" "$id"
    done <<<"$images" | sort -rn -k1,1 | head -n "$TOP_N"
  fi
} | column -t -s $'\t' 2>/dev/null || true

section "${IMAGE_FILTER} images"
try_run "docker image ls" docker image ls --filter "reference=*${IMAGE_FILTER}*" \
  --format 'table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.Size}}\t{{.CreatedSince}}'

section "Build cache"
if docker buildx version >/dev/null 2>&1; then
  try_run "docker buildx du" docker buildx du
else
  note "(buildx not installed; falling back to docker system df -v build cache section)"
  try_run "docker system df -v" bash -c "docker system df -v 2>/dev/null | awk '/^Build cache usage/{p=1} p'"
fi

section "Volumes"
try_run "docker volume ls" docker volume ls --format 'table {{.Driver}}\t{{.Name}}'
dangling="$(docker volume ls -q --filter dangling=true 2>/dev/null | wc -l | tr -d ' ')"
is_uint "$dangling" || dangling=0
if [ "$dangling" -gt 0 ]; then
  warn "${dangling} dangling volume(s); review with: docker volume ls -f dangling=true"
fi

section "Running containers"
try_run "docker ps" docker ps \
  --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Size}}\t{{.Ports}}'

section "Disk usage warnings"
if [ -d "${DOCKER_ROOT}" ] && [ -r "${DOCKER_ROOT}" ]; then
  df_target="${DOCKER_ROOT}"
else
  note "(${DOCKER_ROOT} not accessible; checking / instead)"
  df_target="/"
fi

df_line="$(df -P "${df_target}" 2>/dev/null | awk 'NR==2' || true)"
use_pct="$(printf '%s' "$df_line" | awk '{print $5}' | tr -d '%')"
avail_kb="$(printf '%s' "$df_line" | awk '{print $4}')"
mount="$(printf '%s' "$df_line" | awk '{print $6}')"

if ! is_uint "$use_pct"; then
  note "(could not determine disk usage for ${df_target})"
else
  if is_uint "$avail_kb"; then
    avail_h="$(awk -v k="$avail_kb" 'BEGIN{printf "%.1f GiB", k/1024/1024}')"
  else
    avail_h="unknown"
  fi
  msg="${mount:-$df_target} at ${use_pct}% (${avail_h} free)"
  if [ "$use_pct" -ge "$CRIT_PCT" ]; then
    crit "$msg - run: docker system prune -a --volumes (review first!)"
  elif [ "$use_pct" -ge "$WARN_PCT" ]; then
    warn "$msg - consider: docker system prune / docker buildx prune"
  else
    ok "$msg"
  fi
fi

reclaimable="$(docker system df --format '{{.Type}}\t{{.Reclaimable}}' 2>/dev/null || true)"
if [ -n "$reclaimable" ]; then
  while IFS=$'\t' read -r kind recl; do
    [ -n "$kind" ] || continue
    pct="${recl##*(}"; pct="${pct%%%*}"
    bytes="$(size_to_bytes "${recl%% *}")"
    if is_uint "$pct" && [ "$pct" -ge 50 ] && [ "$bytes" -ge 1000000000 ]; then
      warn "${kind}: ${recl} reclaimable"
    fi
  done <<<"$reclaimable"
fi

printf '\n'
if [ "$WARNINGS" -eq 0 ]; then
  ok "no warnings"
else
  printf '%s%d warning(s) reported.%s\n' "${YELLOW}" "$WARNINGS" "${RESET}"
fi
