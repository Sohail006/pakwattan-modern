# ⚡ Quick Fix: "Unable to connect to the server"

## 🔴 The Problem
Your frontend is trying to connect to the backend API but can't reach it.

## ✅ Solution (3 Steps)

### Step 1: Start the Backend API

Open a **new PowerShell window** and run:
```powershell
cd "E:\Cursor AI\PakWattanAPI"
dotnet run
```

**Wait for this message:**
```
Now listening on: https://localhost:7210
```

**Keep this window open!** The API must stay running.

---

### Step 2: Verify Configuration

Your `.env.local` should have:
```env
NEXT_PUBLIC_BACKEND_BASE_URL=https://localhost:7210
```

**✅ Already fixed!** (Removed trailing slash)

---

### Step 3: Restart Frontend

In your **frontend PowerShell window**:
1. Stop the current process: Press `Ctrl+C`
2. Restart it:
```powershell
cd "E:\Cursor AI\PakWattanModern"
npm run dev
```

---

## 🧪 Test It

1. Open browser: `http://localhost:3000`
2. Open DevTools (F12) → Console tab
3. Navigate to: `/dashboard/contacts`
4. Should work now! ✅

---

## ❌ Still Not Working?

### Check 1: Is Backend Running?
```powershell
Get-Process -Name "PakWattanAPI"
```
If nothing shows, backend is not running → Go to Step 1

### Check 2: Test API Directly
Open in browser: `https://localhost:7210/api/health`

Should return JSON like:
```json
{"status":"healthy","timestamp":"...","service":"PakWattanAPI"}
```

If you get "This site can't be reached" → Backend is not running

### Check 3: Check Browser Console
- Press F12 → Console tab
- Look for errors
- Check what URL it's trying to connect to

---

## 📋 Common Issues

| Issue | Solution |
|-------|----------|
| Backend not running | Run `dotnet run` in PakWattanAPI folder |
| Certificate error | Click "Advanced" → "Proceed to localhost" |
| CORS error | Backend CORS already configured, just restart backend |
| Port already in use | Stop other instances: `Get-Process -Name "PakWattanAPI" \| Stop-Process` |

---

**Need more help?** See `CONNECTION_ERROR_TROUBLESHOOTING.md` for detailed guide.
