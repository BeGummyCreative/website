#!/usr/bin/env bash
set -euo pipefail

LOCAL_DOWNLOADS="${LOCAL_DOWNLOADS:-/Users/chilumbam/Downloads}"
REMOTE="${REMOTE:-macmini-cf}"
REMOTE_ROOT="${REMOTE_ROOT:-/mnt/backup-sd/begum-portfolio-material}"

mkdir -p "$PWD/.transfer-logs"

mapfile -t zips < <(
  find "$LOCAL_DOWNLOADS" -maxdepth 1 -type f \( \
    -name 'OneDrive_*.zip' -o \
    -name 'Film.zip' -o \
    -name '*Portfolio*.zip' \
  \) -print | sort
)

if [ "${#zips[@]}" -eq 0 ]; then
  echo "No matching portfolio ZIP files found in $LOCAL_DOWNLOADS"
  exit 0
fi

ssh "$REMOTE" "mkdir -p '$REMOTE_ROOT/_zips' '$REMOTE_ROOT/source'"

for zip_path in "${zips[@]}"; do
  echo "Transferring $(basename "$zip_path")"
  rsync -avP --append -e "ssh -o BatchMode=yes -o ConnectTimeout=15" \
    "$zip_path" "$REMOTE:$REMOTE_ROOT/_zips/"
done

ssh "$REMOTE" "set -euo pipefail
  for zip_path in '$REMOTE_ROOT'/_zips/*.zip; do
    unzip -n -q \"\$zip_path\" -d '$REMOTE_ROOT/source'
  done
  find '$REMOTE_ROOT/source' -type f | wc -l
  du -sh '$REMOTE_ROOT'
"
