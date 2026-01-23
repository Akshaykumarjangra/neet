# Backup and Restore (PostgreSQL)

## Backup
- Ensure `DATABASE_URL` is set in your environment.
- Use `pg_dump` to create a compressed backup.

PowerShell example:
```powershell
$env:DATABASE_URL="postgres://user:password@host:5432/dbname"
pg_dump $env:DATABASE_URL -Fc -f backups\neet-prep-backup.dump
```

## Restore
- Restore into a target database (empty or freshly created).

PowerShell example:
```powershell
$env:DATABASE_URL="postgres://user:password@host:5432/dbname"
pg_restore -d $env:DATABASE_URL --clean --if-exists backups\neet-prep-backup.dump
```

## Notes
- Use `--clean` only if you want to replace existing objects.
- Keep backups encrypted at rest if they include PII.
