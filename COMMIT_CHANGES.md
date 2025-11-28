# Commit Changes to Server

## Files Changed for Centralized API Configuration

The following files have been updated to use centralized API configuration:

1. `lib/config.ts` - Centralized configuration file
2. `lib/api/client.ts` - Updated to use getApiBaseUrl()
3. `lib/signalr/hubConnection.ts` - Updated to use getApiBaseUrl()
4. `lib/utils/pdfGenerator.ts` - Updated to use getApiBaseUrl()
5. `components/ui/ProfileImageUpload.tsx` - Updated to use getApiBaseUrl()
6. `components/students/StudentCard.tsx` - Updated to use getApiBaseUrl()
7. `components/students/StudentModal.tsx` - Updated to use getApiBaseUrl()
8. `components/students/StudentsTable.tsx` - Updated to use getApiBaseUrl()
9. `app/dashboard/admissions/page.tsx` - Updated to use getApiBaseUrl()
10. `app/dashboard/admin/page.tsx` - Updated to use getApiBaseUrl()
11. `lib/api/users.ts` - Updated to use getApiBaseUrl()
12. `components/ApiTest.tsx` - Updated to use getApiBaseUrl()
13. `next.config.js` - Updated to use environment variable
14. `TEST_REPORT.md` - Test report documentation

## Git Commands to Run

### Step 1: Add all changed files
```bash
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
```

Or add all at once:
```bash
git add -A
```

### Step 2: Commit the changes
```bash
git commit -m "Centralize API configuration to single file (lib/config.ts)

- Updated all files to use getApiBaseUrl() from lib/config.ts
- Removed hardcoded API URLs from components and API files
- Added environment variable support with priority system
- Fixed API_CONFIG to use getter for dynamic URL resolution
- All 11 files now use centralized configuration
- Single source of truth: lib/config.ts line 55"
```

### Step 3: Push to remote repository
```bash
git push origin main

```

Or if your branch is different:
```bash
git push origin master
```

Or if you need to set upstream:
```bash
git push -u origin main
```

## Summary

**What was changed:**
- Centralized all API URL configuration to `lib/config.ts`
- Single file to change when switching between local and production
- Environment variable support with proper priority
- All components and API files now use the centralized config

**Current Configuration:**
- Default URL: `https://localhost:7210` (in lib/config.ts line 55)
- Environment variable: `NEXT_PUBLIC_BACKEND_BASE_URL` (in .env.local)

**To switch environments:**
- Change line 55 in `lib/config.ts` OR
- Update `NEXT_PUBLIC_BACKEND_BASE_URL` in `.env.local`

