#!/usr/bin/env bash
# Daily encrypted backup → Cloudflare R2 (Phase 7/05).
# TODO: install rclone with R2 remote named "r2"; provide BACKUP_PASSPHRASE env.
set -euo pipefail
DATE=$(date +%Y%m%d_%H%M%S)
FILE="/tmp/neetprep_${DATE}.sql.gz"
pg_dump "${DATABASE_URL}" | gzip > "$FILE"
gpg --batch --passphrase "$BACKUP_PASSPHRASE" --symmetric --cipher-algo AES256 -o "${FILE}.gpg" "$FILE"
rclone copy "${FILE}.gpg" r2:neetprep-backups/daily/
rm "$FILE" "${FILE}.gpg"
# retention: 30d daily + 12mo monthly
rclone delete --min-age 30d r2:neetprep-backups/daily/ || true
echo "[backup] $DATE done"
