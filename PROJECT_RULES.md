# Project Rules

- No direct commits to `main`. Use feature branches ➜ PR ➜ CI checks ➜ auto-deploy on merge.
- `dist/` is ephemeral and never edited by hand.
- Every deploy must:
  - Ensure S3 bucket versioning is enabled
  - Snapshot/backup current site before upload
  - Upload with correct Content-Type and Cache-Control
  - Invalidate CloudFront
  - Append logs to `/ops/logs/APP_LOG.md` and a dated deploy log
- Non-destructive mode: never delete project files; use branches and snapshots.
