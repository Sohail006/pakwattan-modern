# API Connection Troubleshooting Guide

## Problem
When accessing `https://pakwattan.edu.pk/login`, you see:
```
Unable to connect to server at http://sohailghsno4-001-site8.rtempurl.com. Please ensure the API server is running.
```

## Root Causes

### 1. **API Server is Down or Unreachable** ⚠️ MOST LIKELY
The API server at `sohailghsno4-001-site8.rtempurl.com` may be:
- Not running
- Temporarily unavailable
- Blocked by firewall
- DNS issues

**Solution:**
- Check if the API server is running
- Verify the server is accessible: Visit `https://sohailghsno4-001-site8.rtempurl.com/api/health` in your browser
- Check server logs for errors
- Contact your hosting provider

### 2. **Protocol Mismatch (HTTP vs HTTPS)** ⚠️ COMMON
Your frontend is HTTPS (`https://pakwattan.edu.pk`) but the API might be HTTP (`http://sohailghsno4-001-site8.rtempurl.com`).

**Why this fails:**
- Browsers block mixed content (HTTPS page calling HTTP API)
- Security policy prevents insecure requests from secure pages

**Solution:**
- ✅ **FIXED**: The code now automatically converts HTTP to HTTPS when frontend is HTTPS
- Ensure your API server supports HTTPS
- Update API server to use HTTPS if possible

### 3. **CORS (Cross-Origin Resource Sharing) Issue** ⚠️ COMMON
The API server doesn't allow requests from `https://pakwattan.edu.pk`.

**Solution:**
Update your API server's CORS configuration to include:
```csharp
policy.WithOrigins(
    "https://pakwattan.edu.pk",
    "http://pakwattan.edu.pk",
    "https://www.pakwattan.edu.pk",
    "http://www.pakwattan.edu.pk"
)
```

### 4. **Environment Variable Not Set**
The production environment might not have `NEXT_PUBLIC_BACKEND_BASE_URL` set correctly.

**Solution:**
Set the environment variable in your production hosting:
```env
NEXT_PUBLIC_BACKEND_BASE_URL=https://sohailghsno4-001-site8.rtempurl.com
```

## Quick Fixes

### Option 1: Use Next.js API Rewrites (Recommended)
This avoids CORS and mixed content issues by proxying requests through your Next.js server.

**Already configured in `next.config.js`** - Just ensure your API server is accessible.

### Option 2: Check API Server Status
1. Open browser console on `https://pakwattan.edu.pk/login`
2. Check the Network tab for failed requests
3. Try accessing the API directly: `https://sohailghsno4-001-site8.rtempurl.com/api/health`

### Option 3: Verify Environment Variables
Check your production environment has:
```env
NEXT_PUBLIC_BACKEND_BASE_URL=https://sohailghsno4-001-site8.rtempurl.com
```

## Testing Steps

1. **Test API Server Directly:**
   ```bash
   curl https://sohailghsno4-001-site8.rtempurl.com/api/health
   ```
   Should return: `{"status":"healthy",...}`

2. **Check Browser Console:**
   - Open `https://pakwattan.edu.pk/login`
   - Open Developer Tools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests

3. **Verify CORS Headers:**
   - In Network tab, click on a failed request
   - Check Response Headers
   - Should see: `Access-Control-Allow-Origin: https://pakwattan.edu.pk`

## Current Configuration

**File:** `lib/config.ts`
- Default API URL: `https://sohailghsno4-001-site8.rtempurl.com`
- Auto-converts HTTP to HTTPS when frontend is HTTPS
- Uses environment variable `NEXT_PUBLIC_BACKEND_BASE_URL` if set

**File:** `next.config.js`
- API rewrites configured to proxy `/api/*` requests
- Should work automatically if API server is accessible

## Next Steps

1. ✅ **Verify API server is running** - Most important!
2. ✅ **Check API server supports HTTPS** - Required for HTTPS frontend
3. ✅ **Update CORS configuration** - Allow requests from pakwattan.edu.pk
4. ✅ **Set environment variables** - In production hosting
5. ✅ **Test the connection** - Use browser console and Network tab

## Still Having Issues?

1. Check server logs for errors
2. Verify DNS resolution for the API domain
3. Test API endpoints directly (curl or Postman)
4. Check firewall/security settings
5. Contact hosting provider support

