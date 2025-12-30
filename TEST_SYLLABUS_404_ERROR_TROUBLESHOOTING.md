# 🔧 Test Syllabus 404 Error - Troubleshooting Guide

**Error:** "The requested resource could not be found. It may have been deleted or moved."

**Date:** December 30, 2025

---

## 🔍 Root Cause Analysis

The error occurs when the frontend tries to access `/api/test-syllabus` but the backend controller route might not match exactly, or the backend server needs to be restarted to load the new controller.

---

## ✅ Solution Applied

### **1. Controller Route Updated**

**File:** `E:\Cursor AI\PakWattanAPI\Controllers\TestSyllabusController.cs`

**Changed from:**
```csharp
[Route("api/[controller]")]  // Resolves to: api/TestSyllabus
```

**Changed to:**
```csharp
[Route("api/test-syllabus")]  // Exact match: api/test-syllabus
```

This ensures the route exactly matches what the frontend is calling.

---

## 🚀 Steps to Fix

### **Step 1: Restart Backend Server**

The backend server must be restarted to load the new controller and route changes.

**Option A: If running in Visual Studio/IDE:**
1. Stop the running backend server
2. Rebuild the project
3. Start the server again

**Option B: If running via command line:**
```bash
# Stop the current server (Ctrl+C)
# Then restart:
cd "E:\Cursor AI\PakWattanAPI"
dotnet run
```

**Option C: If running as a service:**
1. Stop the service
2. Rebuild: `dotnet build`
3. Start the service again

---

### **Step 2: Verify Backend is Running**

Check that the backend server is accessible:

```bash
# Test health endpoint
curl http://localhost:7210/api/health

# Or in browser:
http://localhost:7210/api/health
```

Should return:
```json
{
  "status": "healthy",
  "timestamp": "...",
  "service": "PakWattanAPI"
}
```

---

### **Step 3: Test Test Syllabus Endpoint**

**Public Endpoint (No Auth Required):**
```bash
# Test public endpoint
curl http://localhost:7210/api/test-syllabus/public

# Or in browser:
http://localhost:7210/api/test-syllabus/public
```

**Expected Response:**
- If no data: `[]` (empty array)
- If data exists: Array of test syllabi
- If 404: Controller not loaded (restart needed)
- If 401: Authentication issue (shouldn't happen for public endpoint)

---

### **Step 4: Check Swagger UI**

If Swagger is enabled, verify the endpoint appears:

```
http://localhost:7210/swagger
```

Look for:
- `GET /api/test-syllabus` (admin)
- `GET /api/test-syllabus/public` (public)
- `POST /api/test-syllabus` (admin)
- `PUT /api/test-syllabus/{id}` (admin)
- `DELETE /api/test-syllabus/{id}` (admin)
- `POST /api/test-syllabus/upload-pdf` (admin)

---

## 🔍 Additional Checks

### **1. Verify Controller is Registered**

Check that the controller file exists:
```
E:\Cursor AI\PakWattanAPI\Controllers\TestSyllabusController.cs
```

### **2. Verify Service is Registered**

Check `Program.cs` line ~207:
```csharp
builder.Services.AddScoped<PakWattanAPI.Services.TestSyllabus.ITestSyllabusService, PakWattanAPI.Services.TestSyllabus.TestSyllabusService>();
```

### **3. Verify Database Table Exists**

The migration should have created the table. Verify:
```sql
SELECT * FROM TestSyllabi
```

---

## 🐛 Common Issues & Solutions

### **Issue 1: Backend Server Not Running**
**Symptom:** All API calls fail with network error
**Solution:** Start the backend server

### **Issue 2: Route Mismatch**
**Symptom:** 404 error on `/api/test-syllabus`
**Solution:** ✅ Already fixed - route updated to `api/test-syllabus`

### **Issue 3: Controller Not Loaded**
**Symptom:** 404 error, endpoint doesn't appear in Swagger
**Solution:** Restart backend server

### **Issue 4: CORS Error**
**Symptom:** CORS error in browser console
**Solution:** Check CORS configuration in `Program.cs` includes your frontend URL

### **Issue 5: Database Connection**
**Symptom:** 500 error instead of 404
**Solution:** Check database connection string and ensure migration is applied

---

## 📋 Verification Checklist

After restarting the backend:

- [ ] Backend server is running
- [ ] Health endpoint works: `/api/health`
- [ ] Test syllabus public endpoint accessible: `/api/test-syllabus/public`
- [ ] Swagger UI shows test syllabus endpoints
- [ ] Frontend can call the API (check browser network tab)
- [ ] No 404 errors in browser console

---

## 🧪 Quick Test Script

Run this in browser console after restarting backend:

```javascript
// Test public endpoint
fetch('http://localhost:7210/api/test-syllabus/public')
  .then(r => r.json())
  .then(data => console.log('✅ Public endpoint works:', data))
  .catch(err => console.error('❌ Error:', err));

// Test health endpoint
fetch('http://localhost:7210/api/health')
  .then(r => r.json())
  .then(data => console.log('✅ Health endpoint works:', data))
  .catch(err => console.error('❌ Error:', err));
```

---

## 📝 Next Steps

1. **Restart Backend Server** (most important!)
2. **Test the endpoints** using the script above
3. **Check browser console** for any errors
4. **Verify frontend can connect** to the backend

---

## ✅ Expected Behavior After Fix

- ✅ `/api/test-syllabus/public` returns `[]` (empty array if no data)
- ✅ Frontend can load the public page without errors
- ✅ Dashboard can list/create/edit syllabi
- ✅ No 404 errors in browser console

---

**Status:** Route updated - **Backend server restart required** to apply changes.

