# CORS Configuration Fix for Production

## Problem
When accessing the frontend from `https://pakwattan.edu.pk/login`, you're getting the error:
```
Unable to connect to server at http://sohailghsno4-001-site8.rtempurl.com
```

This is a **CORS (Cross-Origin Resource Sharing)** issue. The API server needs to allow requests from your production domain.

## Solution

### Step 1: Update API Server CORS Configuration

The API server's CORS configuration in `PakWattanAPI/Program.cs` has been updated to include your production domain.

**Updated CORS Policy:**
```csharp
policy.WithOrigins(
    "http://localhost:3000", 
    "https://localhost:3000",
    "http://localhost:3001",
    "https://localhost:3001",
    "https://pakwattan.edu.pk",        // ✅ Added
    "http://pakwattan.edu.pk",         // ✅ Added
    "https://www.pakwattan.edu.pk",    // ✅ Added
    "http://www.pakwattan.edu.pk"      // ✅ Added
)
```

### Step 2: Deploy Updated API Server

After updating the CORS configuration:

1. **Rebuild the API project:**
   ```bash
   cd PakWattanAPI
   dotnet build --configuration Release
   ```

2. **Publish and deploy:**
   ```bash
   dotnet publish --configuration Release
   ```

3. **Deploy to your server** at `http://sohailghsno4-001-site8.rtempurl.com`

4. **Restart the API server** to apply the changes

### Step 3: Verify CORS is Working

After deploying, test the CORS configuration:

1. Open browser console on `https://pakwattan.edu.pk/login`
2. Try to login
3. Check the Network tab for CORS errors
4. You should see `Access-Control-Allow-Origin` header in the response

## Alternative Solution: Use Next.js API Rewrites

If you can't update the API server immediately, you can use Next.js rewrites to proxy requests through your Next.js server (this avoids CORS issues).

### Update API Client to Use Relative URLs

Change the API client to use relative URLs instead of absolute URLs:

```typescript
// In lib/api/client.ts
// Instead of: http://sohailghsno4-001-site8.rtempurl.com/api/auth/login
// Use: /api/auth/login (Next.js will rewrite this)
```

However, this requires updating all API calls to use relative paths.

## Testing

After deploying the CORS fix:

1. ✅ Clear browser cache
2. ✅ Try logging in from `https://pakwattan.edu.pk/login`
3. ✅ Check browser console for any errors
4. ✅ Verify API calls are successful

## Additional Notes

- **Mixed Content Warning**: If your frontend is HTTPS and API is HTTP, browsers may block requests. Consider using HTTPS for the API server as well.
- **CORS Preflight**: The API server must respond to OPTIONS requests for CORS preflight checks.
- **Credentials**: The CORS policy includes `AllowCredentials()` which is needed for JWT authentication.

---

**Status**: CORS configuration updated in `PakWattanAPI/Program.cs`. Deploy the updated API server to apply the changes.

