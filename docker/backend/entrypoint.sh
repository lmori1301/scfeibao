#!/bin/sh
set -eu

if [ -d /app/uploads-seed ] && [ -z "$(find /app/uploads -mindepth 1 -maxdepth 1 2>/dev/null)" ]; then
  cp -R /app/uploads-seed/. /app/uploads/
fi

exec "$@"
