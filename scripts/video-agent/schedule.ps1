<#
.SYNOPSIS
  Register the ZERO AI Video Agent as a Windows Scheduled Task
  Runs every night at 1:00 AM IST

.USAGE
  # Run as Administrator:
  powershell -ExecutionPolicy Bypass -File scripts\video-agent\schedule.ps1
#>

$TaskName = "ZERO-AI-VideoAgent-Overnight"
$ProjectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$ScriptPath = Join-Path $ProjectRoot "scripts\video-agent\overnight.ps1"

# Remove existing task if present
Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction SilentlyContinue

# Create the action
$Action = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-ExecutionPolicy Bypass -NonInteractive -File `"$ScriptPath`"" `
    -WorkingDirectory $ProjectRoot

# Trigger: Daily at 1:00 AM
$Trigger = New-ScheduledTaskTrigger -Daily -At "01:00AM"

# Settings: Allow running on battery, don't stop if on battery, max 4 hours
$Settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -ExecutionTimeLimit (New-TimeSpan -Hours 4) `
    -StartWhenAvailable

# Register
Register-ScheduledTask `
    -TaskName $TaskName `
    -Action $Action `
    -Trigger $Trigger `
    -Settings $Settings `
    -Description "ZERO AI: Overnight video generation for NEET chapters using Gemini + Veo 2" `
    -RunLevel Highest

Write-Host ""
Write-Host "✅ Scheduled Task Created: $TaskName" -ForegroundColor Green
Write-Host "   Time: 1:00 AM daily"
Write-Host "   Script: $ScriptPath"
Write-Host "   Max runtime: 4 hours"
Write-Host ""
Write-Host "To verify: Get-ScheduledTask -TaskName '$TaskName'"
Write-Host "To run now: Start-ScheduledTask -TaskName '$TaskName'"
Write-Host "To remove:  Unregister-ScheduledTask -TaskName '$TaskName'"
