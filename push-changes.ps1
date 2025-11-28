# Git Push Script for API Configuration Changes
# Run this script: .\push-changes.ps1

Write-Host "=== Pushing API Configuration Changes ===" -ForegroundColor Cyan
Write-Host ""

# Check if git is available
try {
    $gitVersion = git --version 2>&1
    Write-Host "Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "Git is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "Not a git repository. Initializing..." -ForegroundColor Yellow
    git init
}

Write-Host ""
Write-Host "Step 1: Adding files..." -ForegroundColor Yellow
git add lib/config.ts
git add lib/api/client.ts
git add lib/signalr/hubConnection.ts
git add lib/utils/pdfGenerator.ts
git add components/ui/ProfileImageUpload.tsx
git add components/students/StudentCard.tsx
git add components/students/StudentModal.tsx
git add components/students/StudentsTable.tsx
git add app/dashboard/admissions/page.tsx
git add app/dashboard/admin/page.tsx
git add lib/api/users.ts
git add components/ApiTest.tsx
git add next.config.js
git add TEST_REPORT.md
git add COMMIT_CHANGES.md

Write-Host "Files added." -ForegroundColor Green
Write-Host ""

# Check status
Write-Host "Step 2: Checking status..." -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "Step 3: Committing changes..." -ForegroundColor Yellow
git commit -m "Centralize API configuration to single file (lib/config.ts)

- Updated all files to use getApiBaseUrl() from lib/config.ts
- Removed hardcoded API URLs from components and API files
- Added environment variable support with priority system
- Fixed API_CONFIG to use getter for dynamic URL resolution
- All 11 files now use centralized configuration
- Single source of truth: lib/config.ts line 55"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Commit successful!" -ForegroundColor Green
} else {
    Write-Host "Commit failed or no changes to commit." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Step 4: Checking remote repository..." -ForegroundColor Yellow
$remote = git remote -v
if ($remote) {
    Write-Host "Remote configured:" -ForegroundColor Green
    Write-Host $remote
    Write-Host ""
    
    Write-Host "Step 5: Pushing to remote..." -ForegroundColor Yellow
    $branch = git branch --show-current
    if (-not $branch) {
        $branch = git branch -a | Select-String "HEAD" | ForEach-Object { $_.ToString().Split()[1] }
    }
    
    Write-Host "Pushing to branch: $branch" -ForegroundColor Cyan
    git push origin $branch
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "=== Push Successful! ===" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "Push failed. You may need to:" -ForegroundColor Red
        Write-Host "1. Set upstream: git push -u origin $branch" -ForegroundColor Yellow
        Write-Host "2. Check remote URL: git remote -v" -ForegroundColor Yellow
        Write-Host "3. Configure remote: git remote add origin <your-repo-url>" -ForegroundColor Yellow
    }
} else {
    Write-Host "No remote repository configured." -ForegroundColor Red
    Write-Host "To add a remote, run:" -ForegroundColor Yellow
    Write-Host "  git remote add origin <your-repo-url>" -ForegroundColor Yellow
    Write-Host "Then push with: git push -u origin main" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Cyan

