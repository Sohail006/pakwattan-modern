# Check and Push Changes to GitHub

## Step 1: Check Current Status

Run this command to see if changes are committed:
```bash
git status
```

## Step 2: Check if Already Pushed to GitHub

Run this to see if your local commits are on GitHub:
```bash
git log origin/main..HEAD
```

If this shows commits, they haven't been pushed yet.

## Step 3: If Changes Are NOT Committed

Run these commands:

```bash
# Add all changes
git add -A

# Commit with message
git commit -m "Centralize API configuration to single file (lib/config.ts)

- Updated all files to use getApiBaseUrl() from lib/config.ts
- Removed hardcoded API URLs from components and API files
- Added environment variable support with priority system
- Fixed API_CONFIG to use getter for dynamic URL resolution
- All 11 files now use centralized configuration
- Single source of truth: lib/config.ts line 55"
```

## Step 4: Push to GitHub

```bash
# Push to main branch
git push origin main

# Or if your branch is master
git push origin master

# Or if you need to set upstream
git push -u origin main
```

## Step 5: Verify on GitHub

1. Go to your GitHub repository
2. Check the "Commits" tab
3. Look for the commit message: "Centralize API configuration to single file"

## Quick One-Liner to Check Everything

```bash
git status && echo "---" && git log --oneline -3 && echo "---" && git remote -v
```

This will show you:
- Current git status
- Last 3 commits
- Remote repository URLs

