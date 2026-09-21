#!/usr/bin/env bash
set -euo pipefail

ENV="${1:-dev}"
ACTION="${2:-up}"

case "$ENV" in
  dev)     FILES="-f deploy/docker-compose.yml -f deploy/docker-compose.dev.yml" ;;
  staging) FILES="-f deploy/docker-compose.yml -f deploy/docker-compose.staging.yml" ;;
  prod)    FILES="-f deploy/docker-compose.yml -f deploy/docker-compose.prod.yml" ;;
  *) echo "Usage: $0 {dev|staging|prod} {up|down|logs|build}"; exit 1 ;;
esac

case "$ACTION" in
  up)    docker compose $FILES up -d --build ;;
  down)  docker compose $FILES down --remove-orphans ;;
  logs)  docker compose $FILES logs -f gateway ;;
  build) docker compose $FILES build --pull ;;
  *)     echo "Unknown action: $ACTION"; exit 1 ;;
esac

docker image prune -f --filter "dangling=true" >/dev/null
