#!/usr/bin/env bash
# docker-rollback.sh — list / rollback / clean-old Docker image tags for compose services.
#
# Usage:
#   scripts/docker-rollback.sh list [service]
#   scripts/docker-rollback.sh rollback <service> <tag>
#   scripts/docker-rollback.sh clean-old <service> [keep]
#
# Env:
#   ROLLBACK_ENV   compose overlay to apply: base (default) | dev | staging | prod
#   ENV_FILE       path to env file (default: deploy/.env.docker)
#   KEEP_COUNT     default keep count for clean-old (default: 3)
#   DRY_RUN=1      print actions without changing anything

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
DEPLOY_DIR="${ROOT_DIR}/deploy"

ENV_FILE="${ENV_FILE:-${DEPLOY_DIR}/.env.docker}"
COMPOSE_BASE="${DEPLOY_DIR}/docker-compose.yml"
ROLLBACK_ENV="${ROLLBACK_ENV:-base}"
KEEP_COUNT="${KEEP_COUNT:-3}"
DRY_RUN="${DRY_RUN:-0}"

PROTECTED_TAGS=(latest dev staging)

# ─── Helpers ─────────────────────────────────────────────────────────────────

log()  { printf '[rollback] %s\n' "$*" >&2; }
die()  { printf '[rollback] ERROR: %s\n' "$*" >&2; exit 1; }

usage() {
  sed -n '2,13p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
  exit "${1:-1}"
}

run() {
  if [[ "${DRY_RUN}" == "1" ]]; then
    log "DRY_RUN: $*"
  else
    "$@"
  fi
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "Required command not found: $1"
}

compose() {
  if docker compose version >/dev/null 2>&1; then
    docker compose "$@"
  elif command -v docker-compose >/dev/null 2>&1; then
    docker-compose "$@"
  else
    die "Docker Compose tidak ditemukan (butuh 'docker compose' atau 'docker-compose')"
  fi
}

# Valid service name: lowercase alnum, '-' or '_' (compose service names).
validate_service() {
  [[ "$1" =~ ^[a-z0-9][a-z0-9_-]{0,62}$ ]] || die "Invalid service name: '$1'"
}

# Valid Docker tag: [A-Za-z0-9_][A-Za-z0-9_.-]{0,127}
validate_tag() {
  [[ "$1" =~ ^[A-Za-z0-9_][A-Za-z0-9_.-]{0,127}$ ]] || die "Invalid image tag: '$1'"
}

validate_keep() {
  [[ "$1" =~ ^[0-9]+$ ]] || die "Keep count must be a non-negative integer, got: '$1'"
}

is_protected_tag() {
  local t
  for t in "${PROTECTED_TAGS[@]}"; do
    [[ "$1" == "$t" ]] && return 0
  done
  return 1
}

# ─── Service → image repo / env var mapping ──────────────────────────────────

image_repo_for() {
  case "$1" in
    gateway)    echo "michishirube/gateway" ;;
    redis)      echo "redis" ;;
    postgres)   echo "postgres" ;;
    pgbouncer)  echo "edoburu/pgbouncer" ;;
    prometheus) echo "prom/prometheus" ;;
    grafana)    echo "grafana/grafana" ;;
    jaeger)     echo "jaegertracing/all-in-one" ;;
    *) die "Unknown service '$1'. Known: gateway redis postgres pgbouncer prometheus grafana jaeger" ;;
  esac
}

tag_var_for() {
  case "$1" in
    gateway)    echo "GATEWAY_TAG" ;;
    redis)      echo "REDIS_TAG" ;;
    postgres)   echo "POSTGRES_TAG" ;;
    pgbouncer)  echo "PGBOUNCER_TAG" ;;
    prometheus) echo "PROMETHEUS_TAG" ;;
    grafana)    echo "GRAFANA_TAG" ;;
    jaeger)     echo "JAEGER_TAG" ;;
    *) die "Unknown service '$1'" ;;
  esac
}

# ─── File checks ─────────────────────────────────────────────────────────────

check_env_file() {
  if [[ ! -f "${ENV_FILE}" ]]; then
    die "Env file not found: ${ENV_FILE}
  Create it from the example:  cp deploy/.env.docker.example deploy/.env.docker
  Or point ENV_FILE=<path> to an existing file."
  fi
  [[ -r "${ENV_FILE}" && -w "${ENV_FILE}" ]] || die "Env file is not readable/writable: ${ENV_FILE}"
}

compose_files() {
  [[ -f "${COMPOSE_BASE}" ]] || die "Compose file not found: ${COMPOSE_BASE}"
  COMPOSE_ARGS=(-f "${COMPOSE_BASE}")
  case "${ROLLBACK_ENV}" in
    base) ;;
    dev|staging|prod)
      local overlay="${DEPLOY_DIR}/docker-compose.${ROLLBACK_ENV}.yml"
      [[ -f "${overlay}" ]] || die "Compose overlay not found: ${overlay}"
      COMPOSE_ARGS+=(-f "${overlay}")
      ;;
    *) die "ROLLBACK_ENV must be one of: base dev staging prod (got '${ROLLBACK_ENV}')" ;;
  esac
}

current_tag_from_env() {
  local var="$1" line
  line="$(grep -E "^[[:space:]]*(export[[:space:]]+)?${var}=" "${ENV_FILE}" | tail -n1 || true)"
  [[ -n "${line}" ]] || { echo ""; return 0; }
  line="${line#*=}"
  line="${line%%#*}"
  line="${line//[\"\']/}"
  line="${line%"${line##*[![:space:]]}"}"
  echo "${line}"
}

# Rewrite VAR=value in env file without sed (avoids injection via tag content).
set_env_var() {
  local var="$1" value="$2" tmp found=0 line
  tmp="$(mktemp "${ENV_FILE}.tmp.XXXXXX")"
  while IFS= read -r line || [[ -n "${line}" ]]; do
    if [[ "${line}" =~ ^[[:space:]]*(export[[:space:]]+)?${var}= ]]; then
      printf '%s=%s\n' "${var}" "${value}" >>"${tmp}"
      found=1
    else
      printf '%s\n' "${line}" >>"${tmp}"
    fi
  done <"${ENV_FILE}"
  if [[ "${found}" -eq 0 ]]; then
    printf '%s=%s\n' "${var}" "${value}" >>"${tmp}"
  fi
  chmod --reference="${ENV_FILE}" "${tmp}" 2>/dev/null || true
  mv -f "${tmp}" "${ENV_FILE}"
}

backup_env() {
  local backup
  backup="${ENV_FILE}.bak.$(date +%Y%m%d-%H%M%S)"
  run cp -p "${ENV_FILE}" "${backup}"
  log "Env backup written: ${backup}"
}

image_exists() {
  docker image inspect "$1" >/dev/null 2>&1
}

# Tags currently used by any container (running or stopped) for a repo.
tags_in_use() {
  local repo="$1"
  docker ps -a --format '{{.Image}}' 2>/dev/null \
    | awk -v repo="${repo}" -F: '$1 == repo && NF == 2 { print $2 }' \
    | sort -u
}

# ─── Commands ────────────────────────────────────────────────────────────────

cmd_list() {
  local service="${1:-}" repo
  local fmt='table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.CreatedSince}}\t{{.Size}}'
  if [[ -n "${service}" ]]; then
    validate_service "${service}"
    repo="$(image_repo_for "${service}")"
    if [[ -f "${ENV_FILE}" ]]; then
      log "Current ${service} tag in env: $(current_tag_from_env "$(tag_var_for "${service}")")"
    fi
    docker images "${repo}" --format "${fmt}"
  else
    local s
    for s in gateway redis postgres pgbouncer prometheus grafana jaeger; do
      docker images "$(image_repo_for "${s}")" --format '{{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.CreatedSince}}\t{{.Size}}'
    done | { printf 'REPOSITORY\tTAG\tIMAGE ID\tCREATED\tSIZE\n'; cat; } | column -t -s $'\t'
  fi
}

cmd_rollback() {
  local service="${1:-}" tag="${2:-}"
  [[ -n "${service}" && -n "${tag}" ]] || usage
  validate_service "${service}"
  validate_tag "${tag}"

  local repo var image current
  repo="$(image_repo_for "${service}")"
  var="$(tag_var_for "${service}")"
  image="${repo}:${tag}"

  check_env_file
  compose_files

  image_exists "${image}" || die "Image not found locally: ${image}
  Available tags:
$(docker images "${repo}" --format '    {{.Tag}}  ({{.CreatedSince}})')"

  if [[ "${ROLLBACK_ENV}" == "dev" && "${service}" == "gateway" ]]; then
    log "WARNING: docker-compose.dev.yml pins gateway image to '${repo}:dev'; ${var} will be updated but the dev overlay will ignore it."
  fi

  current="$(current_tag_from_env "${var}")"
  log "Rolling back ${service}: ${current:-<unset>} -> ${tag}"

  backup_env
  if [[ "${DRY_RUN}" == "1" ]]; then
    log "DRY_RUN: set ${var}=${tag} in ${ENV_FILE}"
  else
    set_env_var "${var}" "${tag}"
  fi

  run compose --project-directory "${DEPLOY_DIR}" --env-file "${ENV_FILE}" \
    "${COMPOSE_ARGS[@]}" up -d --no-build --no-deps "${service}"

  log "Done. ${service} is now on ${image}"
}

cmd_clean_old() {
  local service="${1:-}" keep="${2:-${KEEP_COUNT}}"
  [[ -n "${service}" ]] || usage
  validate_service "${service}"
  validate_keep "${keep}"

  local repo var current
  repo="$(image_repo_for "${service}")"
  var="$(tag_var_for "${service}")"
  current=""
  [[ -f "${ENV_FILE}" ]] && current="$(current_tag_from_env "${var}")"

  local -a in_use=()
  mapfile -t in_use < <(tags_in_use "${repo}")

  local -a all_tags=()
  # Newest first; skip <none>.
  mapfile -t all_tags < <(docker images "${repo}" --format '{{.CreatedAt}}\t{{.Tag}}' \
    | sort -r | awk -F'\t' '$2 != "<none>" { print $2 }')

  [[ "${#all_tags[@]}" -gt 0 ]] || { log "No tagged images found for ${repo}"; return 0; }

  local -a candidates=() removable=()
  local t
  for t in "${all_tags[@]}"; do
    if is_protected_tag "${t}"; then
      log "keep (protected): ${repo}:${t}"; continue
    fi
    if [[ -n "${current}" && "${t}" == "${current}" ]]; then
      log "keep (current in env): ${repo}:${t}"; continue
    fi
    local u used=0
    for u in "${in_use[@]}"; do [[ "${u}" == "${t}" ]] && used=1; done
    if [[ "${used}" -eq 1 ]]; then
      log "keep (used by container): ${repo}:${t}"; continue
    fi
    candidates+=("${t}")
  done

  if [[ "${#candidates[@]}" -le "${keep}" ]]; then
    log "Nothing to clean: ${#candidates[@]} removable tag(s), keep=${keep}"
    return 0
  fi

  removable=("${candidates[@]:${keep}}")
  log "Keeping ${keep} most recent non-protected tag(s); removing ${#removable[@]}:"
  for t in "${removable[@]}"; do
    run docker rmi "${repo}:${t}" || log "WARNING: failed to remove ${repo}:${t}"
  done
}

# ─── Main ────────────────────────────────────────────────────────────────────

main() {
  require_cmd docker
  local cmd="${1:-}"
  shift || true
  case "${cmd}" in
    list)            cmd_list "$@" ;;
    rollback)        cmd_rollback "$@" ;;
    clean-old)       cmd_clean_old "$@" ;;
    -h|--help|help)  usage 0 ;;
    *)               usage 1 ;;
  esac
}

main "$@"
