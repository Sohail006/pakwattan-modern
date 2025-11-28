# Commit All Changes Script
# Run this: .\commit-all-changes.ps1

Write-Host "=== Committing All Changes ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check current status
Write-Host "Step 1: Checking current status..." -ForegroundColor Yellow
$status = git status --porcelain
if ($status) {
    Write-Host "Uncommitted changes found:" -ForegroundColor Yellow
    Write-Host $status
} else {
    Write-Host "No uncommitted changes found." -ForegroundColor Green
    Write-Host "All changes are already committed." -ForegroundColor Green
    exit 0
}

Write-Host ""
Write-Host "Step 2: Staging all changes..." -ForegroundColor Yellow
git add -A
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ All files staged" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to stage files" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 3: Showing staged files..." -ForegroundColor Yellow
$staged = git diff --cached --name-only
Write-Host "Files to be committed:" -ForegroundColor Cyan
$staged | ForEach-Object { Write-Host "  - $_" }

Write-Host ""
Write-Host "Step 4: Committing changes..." -ForegroundColor Yellow
$commitMessage = @"
Centralize API configuration to single file (lib/config.ts)

Updated all files to use getApiBaseUrl() from lib/config.ts
Removed hardcoded API URLs from components and API files
Added environment variable support with priority system
Fixed API_CONFIG to use getter for dynamic URL resolution
All 11 files now use centralized configuration
Single source of truth: lib/config.ts line 55
Added test reports and commit documentation
"@

git commit -m $commitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Commit successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Latest commit:" -ForegroundColor Cyan
    git log -1 --oneline
    Write-Host ""
    Write-Host "Step 5: Final status check..." -ForegroundColor Yellow
    $finalStatus = git status --porcelain
    if ([string]::IsNullOrWhiteSpace($finalStatus)) {
        Write-Host "✓ All changes committed! Working tree is clean." -ForegroundColor Green
    } else {
        Write-Host "Remaining uncommitted changes:" -ForegroundColor Yellow
        Write-Host $finalStatus
    }
} else {
    Write-Host ""
    Write-Host "✗ Commit failed" -ForegroundColor Red
    Write-Host "Possible reasons:" -ForegroundColor Yellow
    Write-Host "  - No changes to commit"
    Write-Host "  - Git not configured (user.name, user.email)"
    Write-Host ""
    Write-Host "Check with: git status" -ForegroundColor Cyan
    exit 1
}

Write-Host ""
Write-Host "=== Done ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "To push to GitHub, run:" -ForegroundColor Yellow
Write-Host "  git push origin main" -ForegroundColor Cyan

