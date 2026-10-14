#!/usr/bin/env bash
# kill-upstream.sh — hentikan mock upstream berdasarkan pid file.
#
# Usage:
#   scripts/chaos/kill-upstream.sh [PID_FILE]
#
# Env:
#   UPSTREAM_PID_FILE   path pid file (default: .upstream.pid)
set -euo pipefail

PID_FILE="${1:-${UPSTREAM_PID_FILE:-.upstream.pid}}"

if [[ ! -f "$PID_FILE" ]]; then
  printf 'Tidak ada pid file: %s\n' "$PID_FILE" >&2
  exit 0
fi

PID="$(tr -d '[:space:]' < "$PID_FILE")"
if [[ ! "$PID" =~ ^[0-9]+$ ]]; then
  printf 'PID tidak valid di %s: %s\n' "$PID_FILE" "$PID" >&2
  rm -f "$PID_FILE"
  exit 1
fi

if kill -0 "$PID" 2>/dev/null; then
  kill "$PID" 2>/dev/null || true
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    kill -0 "$PID" 2>/dev/null || break
    sleep 0.2
  done
  if kill -0 "$PID" 2>/dev/null; then
    kill -9 "$PID" 2>/dev/null || true
  fi
  printf 'Upstream %s dihentikan (pid %s)\n' "$PID_FILE" "$PID"
else
  printf 'Proses %s dari %s sudah tidak aktif\n' "$PID" "$PID_FILE"
fi

rm -f "$PID_FILE"
