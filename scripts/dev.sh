#!/usr/bin/env bash
set -euo pipefail

COMPOSE_BASE="deploy/docker-compose.yml"
COMPOSE_DEV="deploy/docker-compose.dev.yml"

case "${1:-help}" in
  up)
    echo "🚀 Start Redis..."
    docker compose -f "$COMPOSE_BASE" -f "$COMPOSE_DEV" up -d
    echo "⏳ Tunggu Redis ready..."
    until docker exec gateway-redis-dev redis-cli ping 2>/dev/null | grep -q PONG; do
      sleep 1
    done
    echo "✅ Redis ready"
    echo "🚀 Start gateway..."
    pnpm start:dev
    ;;
  down)
    docker compose -f "$COMPOSE_BASE" -f "$COMPOSE_DEV" down
    ;;
  reset)
    docker compose -f "$COMPOSE_BASE" -f "$COMPOSE_DEV" down -v
    docker compose -f "$COMPOSE_BASE" -f "$COMPOSE_DEV" up -d
    ;;
  logs)
    docker compose -f "$COMPOSE_BASE" -f "$COMPOSE_DEV" logs -f redis
    ;;
  status)
    docker compose -f "$COMPOSE_BASE" -f "$COMPOSE_DEV" ps
    ;;
  *)
    echo "Usage: $0 {up|down|reset|logs|status}"
    exit 1
    ;;
esac
