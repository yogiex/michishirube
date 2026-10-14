#!/usr/bin/env bash
# flush-redis.sh — kosongkan database Redis untuk testing/chaos.
#
# Usage:
#   scripts/chaos/flush-redis.sh [db]
#
# Env:
#   REDIS_HOST       (default: localhost)
#   REDIS_PORT       (default: 6379)
#   REDIS_PASSWORD   (default: kosong)
#   REDIS_DB         database yang dikosongkan (default: 0)
set -euo pipefail

REDIS_HOST="${REDIS_HOST:-localhost}"
REDIS_PORT="${REDIS_PORT:-6379}"
REDIS_PASSWORD="${REDIS_PASSWORD:-}"
REDIS_DB="${1:-${REDIS_DB:-0}}"

run_redis_cli() {
  if [[ -n "$REDIS_PASSWORD" ]]; then
    redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" -a "$REDIS_PASSWORD" --no-auth-warning "$@"
  else
    redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" "$@"
  fi
}

if command -v redis-cli >/dev/null 2>&1; then
  run_redis_cli -n "$REDIS_DB" FLUSHDB
  printf 'Redis %s:%s db %s di-flush\n' "$REDIS_HOST" "$REDIS_PORT" "$REDIS_DB"
  exit 0
fi

if command -v docker >/dev/null 2>&1; then
  DOCKER_CONTAINER="${REDIS_CONTAINER:-gateway-redis-dev}"
  if docker exec "$DOCKER_CONTAINER" redis-cli -n "$REDIS_DB" FLUSHDB >/dev/null 2>&1; then
    printf 'Redis container %s db %s di-flush\n' "$DOCKER_CONTAINER" "$REDIS_DB"
    exit 0
  fi
fi

printf 'redis-cli tidak tersedia dan fallback docker gagal\n' >&2
exit 1
