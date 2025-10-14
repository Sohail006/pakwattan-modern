# 🚀 Simple Environment Variables Setup

## What You Need to Do (Step by Step)

### Step 1: Create Environment Files 📁

Create these files in your project root (`E:\Cursor AI\PakWattanModern\`):

#### File 1: `.env.local` (for development)
```env
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=Pak Wattan School & College of Sciences
```

#### File 2: `.env.production` (for SharkASP.net)
```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://www.sharkasp.net
NEXT_PUBLIC_API_URL=https://www.sharkasp.net/api
NEXT_PUBLIC_APP_NAME=Pak Wattan School & College of Sciences
```

### Step 2: Test Your Setup 🧪

1. **Add the test component to your home page:**
   ```typescript
   // In app/page.tsx, add this import
   import EnvTest from '@/components/EnvTest'
   
   // Add this component somewhere in your JSX
   <EnvTest />
   ```

2. **Run your development server:**
   ```bash
   npm run dev
   ```

3. **Check the test component** - it will show you all your environment variables

### Step 3: Use Variables in Your Code 💻

#### Example 1: API Calls
```typescript
// Instead of hardcoding URLs
const response = await fetch('http://localhost:5000/api/contact')

// Use environment variables
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`)
```

#### Example 2: Site URLs
```typescript
// Instead of hardcoding
const siteUrl = 'http://localhost:3000'

// Use environment variables
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
```

### Step 4: Deploy to SharkASP.net 🌐

1. **Upload your `.env.production` file** to your server
2. **Or set the variables** in your hosting control panel
3. **Your app will automatically use the production values**

## 🔍 Quick Reference

### Environment Variable Rules:
- ✅ **NEXT_PUBLIC_** prefix = Available in browser (client-side)
- ❌ **No prefix** = Server-side only (more secure)
- 🔄 **Different values** for development vs production

### Common Variables:
```env
# Basic (required)
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://www.sharkasp.net
NEXT_PUBLIC_API_URL=https://www.sharkasp.net/api

# Optional
YOUTUBE_API_KEY=your_key_here
NEXT_PUBLIC_GA_ID=your_analytics_id_here
```

## 🆘 Still Confused?

**Think of environment variables like this:**
- They're **settings** for your app
- Like changing the **volume** on your TV
- Same TV, different volume for different rooms
- Same app, different settings for different environments

**Need help?** Ask me specific questions like:
- "How do I set the YouTube API key?"
- "Why isn't my variable working?"
- "What should I put in the production file?"
