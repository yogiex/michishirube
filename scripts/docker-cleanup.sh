#!/usr/bin/env bash
# docker-cleanup.sh — housekeeping untuk image/container/cache Docker proyek ini.
#
# Usage:
#   scripts/docker-cleanup.sh [MODE] [--keep N] [--yes] [--dry-run] [--help]
#
# MODE:
#   soft        (default) rotasi tag image, hapus container mati, hapus dangling image
#   aggressive  soft + prune build cache (BUILD_CACHE_RETENTION) + volume/network dangling
#   nuclear     aggressive + hapus SEMUA image proyek (kecuali tag terproteksi) + system prune -a
#   report      hanya tampilkan laporan, tidak menghapus apa pun
#
# Env:
#   IMAGE_REPO             repo image proyek        (default: michishirube/gateway)
#   KEEP_COUNT             jumlah tag versi disimpan (default: 3, override dgn --keep)
#   KEEP_TAGS              tag yang tidak boleh dihapus, dipisah koma
#                          (default: latest,dev,staging — selalu ditambahkan meski di-override)
#   BUILD_CACHE_RETENTION  filter until= untuk builder prune (default: 168h)
#   LOG_FILE               path log; relatif terhadap repo root (default: docker-cleanup.log)
#   LOG_MAX_BYTES          rotasi log jika melebihi ukuran ini (default: 1048576)
#   LOG_KEEP               jumlah log lama disimpan (default: 3)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

IMAGE_REPO="${IMAGE_REPO:-michishirube/gateway}"
KEEP_COUNT="${KEEP_COUNT:-3}"
KEEP_TAGS="${KEEP_TAGS:-latest,dev,staging}"
BUILD_CACHE_RETENTION="${BUILD_CACHE_RETENTION:-168h}"
LOG_FILE="${LOG_FILE:-docker-cleanup.log}"
LOG_MAX_BYTES="${LOG_MAX_BYTES:-1048576}"
LOG_KEEP="${LOG_KEEP:-3}"

readonly PROTECTED_TAGS=(latest dev staging)

MODE="soft"
ASSUME_YES=0
DRY_RUN=0

usage() {
  sed -n '2,/^$/p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
}

die() {
  printf 'ERROR: %s\n' "$*" >&2
  exit 1
}

# ---------- argument parsing ----------
while [[ $# -gt 0 ]]; do
  case "$1" in
    soft | aggressive | nuclear | report) MODE="$1" ;;
    --aggressive) MODE="aggressive" ;;
    --nuclear) MODE="nuclear" ;;
    --report) MODE="report" ;;
    --keep)
      [[ $# -ge 2 ]] || die "--keep membutuhkan nilai"
      KEEP_COUNT="$2"
      shift
      ;;
    --keep=*) KEEP_COUNT="${1#--keep=}" ;;
    --yes | -y) ASSUME_YES=1 ;;
    --dry-run | -n) DRY_RUN=1 ;;
    --help | -h)
      usage
      exit 0
      ;;
    *) die "Argumen tidak dikenal: $1 (lihat --help)" ;;
  esac
  shift
done

# ---------- validation ----------
[[ "$KEEP_COUNT" =~ ^[0-9]+$ ]] || die "--keep harus bilangan bulat >= 0, diterima: '${KEEP_COUNT}'"
[[ "$BUILD_CACHE_RETENTION" =~ ^[0-9]+(h|m|s)?$ ]] || die "BUILD_CACHE_RETENTION tidak valid: '${BUILD_CACHE_RETENTION}'"
[[ "$LOG_MAX_BYTES" =~ ^[0-9]+$ ]] || die "LOG_MAX_BYTES harus angka"
[[ "$LOG_KEEP" =~ ^[0-9]+$ ]] || die "LOG_KEEP harus angka"

if [[ "$LOG_FILE" != /* ]]; then
  LOG_FILE="${REPO_ROOT}/${LOG_FILE}"
fi

command -v docker >/dev/null 2>&1 || die "docker tidak ditemukan di PATH"
docker info >/dev/null 2>&1 || die "Docker daemon tidak dapat diakses (apakah berjalan / punya izin?)"

# ---------- protected tag set ----------
declare -A KEEP_SET=()
for t in "${PROTECTED_TAGS[@]}"; do KEEP_SET["$t"]=1; done
IFS=',' read -r -a _user_tags <<<"$KEEP_TAGS"
for t in "${_user_tags[@]}"; do
  t="${t//[[:space:]]/}"
  [[ -n "$t" ]] && KEEP_SET["$t"]=1
done

is_protected_tag() {
  [[ -n "${KEEP_SET[$1]:-}" ]]
}

# ---------- logging ----------
rotate_log() {
  mkdir -p "$(dirname "$LOG_FILE")"
  [[ -f "$LOG_FILE" ]] || return 0
  local size
  size=$(wc -c <"$LOG_FILE")
  ((size >= LOG_MAX_BYTES)) || return 0
  local i
  for ((i = LOG_KEEP - 1; i >= 1; i--)); do
    [[ -f "${LOG_FILE}.${i}" ]] && mv -f "${LOG_FILE}.${i}" "${LOG_FILE}.$((i + 1))"
  done
  if ((LOG_KEEP > 0)); then
    mv -f "$LOG_FILE" "${LOG_FILE}.1"
  else
    : >"$LOG_FILE"
  fi
  rm -f "${LOG_FILE}.$((LOG_KEEP + 1))"
}

log() {
  local msg="[$(date -u +%Y-%m-%dT%H:%M:%SZ)] [${MODE}] $*"
  printf '%s\n' "$msg"
  printf '%s\n' "$msg" >>"$LOG_FILE"
}

run() {
  if ((DRY_RUN)); then
    log "DRY-RUN: $*"
  else
    log "RUN: $*"
    "$@"
  fi
}

# ---------- report ----------
report() {
  local title="$1"
  log "==== ${title} ===="
  log "Image proyek (${IMAGE_REPO}):"
  docker image ls "$IMAGE_REPO" --format '  {{.Repository}}:{{.Tag}}  {{.ID}}  {{.Size}}  {{.CreatedSince}}' | while IFS= read -r line; do log "$line"; done
  log "Dangling image: $(docker image ls -q --filter dangling=true | wc -l)"
  log "Container mati: $(docker container ls -aq --filter status=exited --filter status=dead --filter status=created | wc -l)"
  log "Volume dangling: $(docker volume ls -q --filter dangling=true | wc -l)"
  log "Disk usage:"
  docker system df --format '  {{.Type}}\t{{.TotalCount}}\t{{.Size}}\t{{.Reclaimable}}' | while IFS= read -r line; do log "$line"; done
}

# ---------- cleanup steps ----------
rotate_image_tags() {
  log "-- Rotasi tag image ${IMAGE_REPO} (keep=${KEEP_COUNT}, protected=${!KEEP_SET[*]})"
  local -a candidates=()
  local tag
  # Format {{.CreatedAt}} sortable (YYYY-MM-DD HH:MM:SS ...); urutkan terbaru dulu.
  while IFS=$'\t' read -r _created tag; do
    [[ -z "$tag" || "$tag" == "<none>" ]] && continue
    is_protected_tag "$tag" && continue
    candidates+=("$tag")
  done < <(docker image ls "$IMAGE_REPO" --format '{{.CreatedAt}}'$'\t''{{.Tag}}' | sort -r)

  local total=${#candidates[@]}
  if ((total <= KEEP_COUNT)); then
    log "Tag versi: ${total}, tidak ada yang dirotasi."
    return 0
  fi
  local i
  for ((i = KEEP_COUNT; i < total; i++)); do
    tag="${candidates[$i]}"
    is_protected_tag "$tag" && continue
    run docker image rm "${IMAGE_REPO}:${tag}" || log "WARN: gagal menghapus ${IMAGE_REPO}:${tag} (mungkin dipakai container)"
  done
}

remove_dead_containers() {
  log "-- Hapus container mati"
  local -a ids=()
  mapfile -t ids < <(docker container ls -aq --filter status=exited --filter status=dead --filter status=created)
  if ((${#ids[@]} == 0)); then
    log "Tidak ada container mati."
    return 0
  fi
  run docker container rm "${ids[@]}" || log "WARN: sebagian container tidak dapat dihapus"
}

remove_dangling_images() {
  log "-- Hapus dangling image"
  run docker image prune -f --filter dangling=true
}

prune_build_cache() {
  log "-- Prune build cache (until=${BUILD_CACHE_RETENTION})"
  run docker builder prune -f --filter "until=${BUILD_CACHE_RETENTION}"
}

prune_volumes_networks() {
  log "-- Prune volume & network dangling"
  run docker volume prune -f
  run docker network prune -f
}

remove_unused_images() {
  log "-- NUCLEAR: hapus semua image yang tidak dipakai"
  run docker image prune -a -f
}

confirm_nuclear() {
  ((ASSUME_YES)) && return 0
  if [[ ! -t 0 ]]; then
    die "Mode nuclear membutuhkan konfirmasi: jalankan di TTY atau tambahkan --yes"
  fi
  printf 'Mode NUCLEAR akan menghapus semua image proyek (kecuali %s), semua cache, volume & network tak terpakai.\n' "${!KEEP_SET[*]}"
  read -r -p "Ketik 'nuclear' untuk melanjutkan: " answer
  [[ "$answer" == "nuclear" ]] || die "Dibatalkan."
}

# ---------- main ----------
rotate_log
log "Mulai docker-cleanup (mode=${MODE}, dry-run=${DRY_RUN}, repo=${REPO_ROOT})"
report "SEBELUM"

case "$MODE" in
  report)
    log "Mode report: tidak ada perubahan."
    exit 0
    ;;
  soft)
    rotate_image_tags
    remove_dead_containers
    remove_dangling_images
    ;;
  aggressive)
    rotate_image_tags
    remove_dead_containers
    remove_dangling_images
    prune_build_cache
    prune_volumes_networks
    ;;
  nuclear)
    confirm_nuclear
    remove_dead_containers
    remove_unused_images
    run docker builder prune -af
    prune_volumes_networks
    ;;
esac

report "SESUDAH"
log "Selesai."
