#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 path/to/release.zip"
  exit 1
fi

zip_path="$1"
if [[ ! -f "$zip_path" ]]; then
  echo "ZIP not found: $zip_path"
  exit 1
fi

required=(
  "micro-saas-starter-kit/app/"
  "micro-saas-starter-kit/core/"
  "micro-saas-starter-kit/modules/"
  "micro-saas-starter-kit/prisma/"
  "micro-saas-starter-kit/src/"
  "micro-saas-starter-kit/docs/"
  "micro-saas-starter-kit/README.md"
  "micro-saas-starter-kit/package.json"
)

for entry in "${required[@]}"; do
  if ! zipinfo -1 "$zip_path" | rg -q "^${entry}"; then
    echo "Missing required entry: $entry"
    exit 1
  fi
done

for forbidden in "node_modules/" ".git/" ".next/" "dist/" ".DS_Store"; do
  if zipinfo -1 "$zip_path" | rg -q "$forbidden"; then
    echo "Forbidden artifact found in ZIP: $forbidden"
    exit 1
  fi
done

echo "Release ZIP validation passed: $zip_path"
