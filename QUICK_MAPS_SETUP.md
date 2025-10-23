# 🗺️ Quick Google Maps Setup Guide

## 🚀 Get Your Google Maps API Key (5 minutes)

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/
2. Sign in with your Google account
3. Create a new project or select existing one

### Step 2: Enable Maps JavaScript API
1. Go to "APIs & Services" > "Library"
2. Search for "Maps JavaScript API"
3. Click on it and press "Enable"

### Step 3: Create API Key
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy your API key

### Step 4: Secure Your API Key (Important!)
1. Click on your API key to edit it
2. Under "Application restrictions", select "HTTP referrers"
3. Add your domains:
   - `localhost:3000/*` (for development)
   - `yourdomain.com/*` (for production)
4. Under "API restrictions", select "Restrict key"
5. Choose "Maps JavaScript API"
6. Save changes

## 🔧 Add API Key to Your Project

### Option 1: Environment File (Recommended)
Create `.env.local` in your project root:

```bash
# .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### Option 2: Direct in Code (Not Recommended for Production)
In `MapSection.tsx`, replace:
```typescript
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
```
with:
```typescript
const apiKey = 'your_actual_api_key_here'
```

## 🚀 Test Your Setup

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Visit the contact page:**
   ```
   http://localhost:3000/contact
   ```

3. **You should see:**
   - ✅ Interactive Google Map
   - ✅ Campus markers
   - ✅ Clickable info windows
   - ✅ Zoom and pan functionality

## 🎯 What You'll Get

### Interactive Features
- **Zoom & Pan**: Navigate around the map
- **Campus Markers**: Click to see details
- **Info Windows**: Campus info with contact details
- **Mobile Optimized**: Touch-friendly on phones
- **Custom Styling**: Branded markers and colors

### Campus Locations
- **Main Campus (Boys Wing)**: Azam Khan road, beside Mubarak Plaza
- **Primary Section**: Gohar Market, Main Havelian City  
- **Girls Campus**: Havelian, Abbottabad

## 🚨 Troubleshooting

### Map Not Loading?
1. Check API key is correct
2. Verify API key restrictions
3. Make sure Maps JavaScript API is enabled
4. Check browser console for errors

### API Key Invalid?
1. Verify the key is copied correctly
2. Check if API key restrictions are too strict
3. Ensure Maps JavaScript API is enabled

### Still Not Working?
1. Check your internet connection
2. Try a different browser
3. Clear browser cache
4. Check the browser console for error messages

## 💰 Cost Information

- **Free Tier**: 28,000 map loads per month
- **After Free Tier**: $7 per 1,000 additional loads
- **For Most Websites**: Free tier is sufficient

## 🔒 Security Best Practices

1. **Never commit API keys to Git**
2. **Use environment variables**
3. **Restrict API key to your domains**
4. **Monitor usage in Google Cloud Console**
5. **Set up billing alerts**

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Verify your API key setup
3. Test with a simple HTML file first
4. Contact Google Cloud Support if needed

---

**🎉 Once set up, your contact page will have a beautiful, interactive Google Map showing all your campus locations!**
