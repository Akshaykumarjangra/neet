<#
.SYNOPSIS
  ZERO AI — Overnight Video Agent Launcher
  Starts Postgres (if needed) and runs the video generation pipeline.

.DESCRIPTION
  Schedule this script in Windows Task Scheduler to run at 1:00 AM daily.
  It handles: Postgres startup → Video Agent → Logging → Cleanup.

.USAGE
  # Manual run:
  powershell -ExecutionPolicy Bypass -File scripts\video-agent\overnight.ps1

  # Schedule at 1 AM daily:
  powershell -ExecutionPolicy Bypass -File scripts\video-agent\schedule.ps1
#>

$ErrorActionPreference = "Continue"
$ProjectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $ProjectRoot

$Timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
$LogFile = "scripts\video-agent\runs\$Timestamp.log"
New-Item -ItemType Directory -Path "scripts\video-agent\runs" -Force | Out-Null

function Log($msg) {
    $line = "[$(Get-Date -Format 'HH:mm:ss')] $msg"
    Write-Host $line
    Add-Content -Path $LogFile -Value $line
}

# ── Step 1: Ensure Postgres is running ──
Log "Checking PostgreSQL..."
$pgRunning = $false
try {
    $result = & npx tsx -e "
      const pg = require('pg');
      const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/neetprep' });
      pool.query('SELECT 1').then(() => { console.log('OK'); pool.end(); }).catch(() => { console.log('FAIL'); pool.end(); });
    " 2>&1
    if ($result -match "OK") { $pgRunning = $true }
} catch {}

if (-not $pgRunning) {
    Log "PostgreSQL not running. Attempting docker-compose up..."
    try {
        & docker-compose up -d postgres 2>&1 | ForEach-Object { Log "  docker: $_" }
        Start-Sleep -Seconds 5
        Log "Postgres started via Docker."
    } catch {
        Log "ERROR: Cannot start Postgres. Install Docker or start Postgres manually."
        Log "Skipping video generation. Exiting."
        exit 1
    }
}

Log "PostgreSQL: OK"

# ── Step 2: Run the Video Agent ──
Log "Starting Video Agent..."
Log "═════════════════════════════════════════════════════"

try {
    & npx tsx scripts/video-agent/run.ts 2>&1 | ForEach-Object {
        Log $_
    }
    $exitCode = $LASTEXITCODE
} catch {
    Log "ERROR: Video Agent crashed: $_"
    $exitCode = 1
}

# ── Step 3: Summary ──
Log "═════════════════════════════════════════════════════"
if ($exitCode -eq 0) {
    Log "✅ Overnight run completed successfully."
} else {
    Log "⚠️  Overnight run finished with errors (exit code: $exitCode)."
}

Log "Full log saved to: $LogFile"
