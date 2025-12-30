# 🔧 Connection Error Troubleshooting

## Error Message
**"Unable to connect to the server. Please check your internet connection and ensure the service is available."**

## 🔍 Common Causes & Solutions

### 1. **Backend API is Not Running** ⚠️ MOST LIKELY

**Check if API is running:**
```powershell
Get-Process -Name "PakWattanAPI" -ErrorAction SilentlyContinue
```

**If not running, start it:**
```powershell
cd "E:\Cursor AI\PakWattanAPI"
dotnet run
```

The API should start on:
- `https://localhost:7210` (HTTPS)
- `http://localhost:5000` (HTTP)

---

### 2. **Wrong API URL Configuration** ⚠️ COMMON

**Current Configuration:**
- Default URL: `https://sohailghsno4-001-site8.rtempurl.com` (Production)
- If running locally, you need to configure localhost

**Solution for Local Development:**

Create/Edit `.env.local` in `PakWattanModern` folder:
```env
NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:5000
# OR
NEXT_PUBLIC_BACKEND_BASE_URL=https://localhost:7210
```

**Then restart your frontend:**
```powershell
cd "E:\Cursor AI\PakWattanModern"
npm run dev
```

---

### 3. **CORS (Cross-Origin Resource Sharing) Issue**

**If you see CORS errors in browser console:**

The backend needs to allow requests from `http://localhost:3000`.

**Check backend CORS configuration in `Program.cs`:**
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",  // ← Make sure this is included
            "https://localhost:3000",
            // ... other origins
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});
```

---

### 4. **HTTPS Certificate Issue (Local Development)**

**If using HTTPS locally and getting certificate errors:**

**Option A: Use HTTP for local development**
```env
NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:5000
```

**Option B: Trust the development certificate**
```powershell
cd "E:\Cursor AI\PakWattanAPI"
dotnet dev-certs https --trust
```

---

### 5. **Firewall Blocking Connection**

**Check Windows Firewall:**
- Ensure port 5000 (HTTP) or 7210 (HTTPS) is not blocked
- Allow .NET applications through firewall

---

## 🧪 Quick Diagnostic Steps

### Step 1: Check if Backend is Running
```powershell
# Check if process is running
Get-Process -Name "PakWattanAPI" -ErrorAction SilentlyContinue

# Check if port is listening
netstat -an | findstr "5000"
netstat -an | findstr "7210"
```

### Step 2: Test API Directly in Browser
Open in browser:
- `http://localhost:5000/api/health`
- OR `https://localhost:7210/api/health`

Should return: `{"status":"healthy",...}`

### Step 3: Check Browser Console
Open browser DevTools (F12) → Console tab
- Look for CORS errors
- Look for network errors
- Check what URL is being called

### Step 4: Check Frontend Configuration
In browser console, run:
```javascript
// Check what API URL is being used
console.log('API URL:', window.location.origin);
```

---

## 🚀 Quick Fix Checklist

- [ ] Backend API is running (`dotnet run` in PakWattanAPI folder)
- [ ] Frontend is configured to use localhost (`.env.local` file)
- [ ] CORS is configured in backend to allow `http://localhost:3000`
- [ ] No firewall blocking ports 5000/7210
- [ ] Browser console shows the correct API URL being called

---

## 📝 Step-by-Step Fix

### For Local Development:

1. **Start Backend:**
   ```powershell
   cd "E:\Cursor AI\PakWattanAPI"
   dotnet run
   ```
   Note the URL it starts on (usually `https://localhost:7210`)

2. **Configure Frontend:**
   Create `E:\Cursor AI\PakWattanModern\.env.local`:
   ```env
   NEXT_PUBLIC_BACKEND_BASE_URL=https://localhost:7210
   ```

3. **Restart Frontend:**
   ```powershell
   cd "E:\Cursor AI\PakWattanModern"
   # Stop current process (Ctrl+C)
   npm run dev
   ```

4. **Test Connection:**
   - Open browser: `http://localhost:3000`
   - Open DevTools (F12) → Console
   - Check for errors
   - Try accessing Contacts Dashboard

---

## 🔍 Debug Information

**To see what URL is being used, check browser console:**
- In development mode, the API client logs the URL being used
- Look for: `[API Config] Using...`

**To see detailed error:**
- Open browser DevTools (F12)
- Go to Network tab
- Try the action that fails
- Check the failed request for details

---

## ✅ Expected Behavior

**When working correctly:**
- Backend API running on `https://localhost:7210`
- Frontend running on `http://localhost:3000`
- Frontend configured to use `https://localhost:7210`
- No CORS errors in console
- API calls succeed

---

**Still having issues?** Check:
1. Backend logs for errors
2. Browser console for detailed error messages
3. Network tab in DevTools for failed requests
