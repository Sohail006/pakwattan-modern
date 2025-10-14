# 🔧 Environment Variables Guide for PakWattanModern

## What are Environment Variables?

Environment variables are **configuration values** that your application uses to behave differently in different environments (development, production, etc.). Think of them as **settings** that you can change without modifying your code.

## 🎯 Why Do We Need Them?

### 1. **Security** 🔒
- Store sensitive information like API keys, passwords, database URLs
- Keep secrets out of your code (so they don't get committed to Git)

### 2. **Flexibility** 🔄
- Same code works in development and production
- Easy to change settings without code changes

### 3. **Configuration** ⚙️
- Different settings for different environments
- Easy to manage multiple deployments

## 📝 Common Environment Variables

### **API URLs**
```env
# Development (your local computer)
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Production (SharkASP.net)
NEXT_PUBLIC_API_URL=https://www.sharkasp.net/api
```

### **Database Connections**
```env
# Development
DATABASE_URL=mysql://user:password@localhost:3306/pakwattan_dev

# Production
DATABASE_URL=mysql://user:password@sharkasp.net:3306/pakwattan_prod
```

### **API Keys**
```env
# YouTube API Key
YOUTUBE_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🛠️ How to Set Environment Variables

### **Method 1: .env Files (Recommended)**

#### Step 1: Create Environment Files
Create these files in your project root:

**`.env.local`** (for development - this file is ignored by Git)
```env
# Development Environment Variables
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
YOUTUBE_API_KEY=your_development_youtube_key_here
```

**`.env.production`** (for production)
```env
# Production Environment Variables
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://www.sharkasp.net/api
NEXT_PUBLIC_SITE_URL=https://www.sharkasp.net
YOUTUBE_API_KEY=your_production_youtube_key_here
```

#### Step 2: Load the Right File
Next.js automatically loads the correct file based on your environment:
- Development: `.env.local`
- Production: `.env.production`

### **Method 2: Server Environment Variables (SharkASP.net)**

#### For SharkASP.net Hosting:

1. **In your hosting control panel:**
   - Go to "Environment Variables" or "App Settings"
   - Add your variables there

2. **Or create a `.env` file on the server:**
   ```env
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://www.sharkasp.net/api
   NEXT_PUBLIC_SITE_URL=https://www.sharkasp.net
   YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

## 🔍 How to Use Environment Variables in Your Code

### **In Next.js Components:**

```typescript
// ✅ CORRECT - Use NEXT_PUBLIC_ prefix for client-side
const apiUrl = process.env.NEXT_PUBLIC_API_URL
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

// ✅ CORRECT - Server-side only (no NEXT_PUBLIC_ prefix)
const youtubeKey = process.env.YOUTUBE_API_KEY
const dbUrl = process.env.DATABASE_URL
```

### **Example Usage in Your Components:**

```typescript
// components/contact/ContactForm.tsx
const ContactForm = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Use environment variable for API URL
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
      method: 'POST',
      body: JSON.stringify(formData)
    })
  }
}
```

## 📋 Environment Variables for Your Project

### **Required Variables:**

```env
# Basic Configuration
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://www.sharkasp.net
NEXT_PUBLIC_API_URL=https://www.sharkasp.net/api

# YouTube Integration (Optional)
YOUTUBE_API_KEY=your_youtube_api_key_here
YOUTUBE_CHANNEL_ID=UCpakwattanSchoolCollege

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id_here

# Database (If using)
DATABASE_URL=your_database_connection_string_here
```

### **How to Get These Values:**

#### 1. **YouTube API Key:**
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a project
- Enable YouTube Data API v3
- Create credentials (API Key)
- Copy the key

#### 2. **Google Analytics ID:**
- Go to [Google Analytics](https://analytics.google.com/)
- Create a property
- Get your Measurement ID (G-XXXXXXXXXX)

#### 3. **Database URL:**
- Get from your SharkASP.net hosting control panel
- Format: `mysql://username:password@host:port/database_name`

## 🚀 Setting Up for SharkASP.net Deployment

### **Step 1: Create Production Environment File**
Create `.env.production` in your project root:

```env
# Production Environment Variables for SharkASP.net
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://www.sharkasp.net/api
NEXT_PUBLIC_SITE_URL=https://www.sharkasp.net
NEXT_PUBLIC_APP_NAME=Pak Wattan School & College of Sciences

# YouTube API Configuration
YOUTUBE_API_KEY=your_youtube_api_key_here
YOUTUBE_CHANNEL_ID=UCpakwattanSchoolCollege

# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id_here

# Database (if needed)
DATABASE_URL=your_database_connection_string_here
```

### **Step 2: Update Your Code to Use Variables**

#### In `next.config.js`:
```javascript
const nextConfig = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? `${process.env.NEXT_PUBLIC_API_URL}/:path*` 
          : 'http://localhost:5000/api/:path*'
      }
    ]
  }
}
```

#### In Your Components:
```typescript
// Use environment variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

// Make API calls
const response = await fetch(`${apiUrl}/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
```

## 🔒 Security Best Practices

### **DO:**
- ✅ Use `NEXT_PUBLIC_` prefix only for client-side variables
- ✅ Keep sensitive data in server-side only variables
- ✅ Use different values for development and production
- ✅ Never commit `.env.local` to Git

### **DON'T:**
- ❌ Put API keys in client-side code
- ❌ Commit `.env.local` files to version control
- ❌ Use the same API keys for development and production
- ❌ Hardcode sensitive values in your code

## 🧪 Testing Your Environment Variables

### **Check if variables are loaded:**
```typescript
// Add this to any component to test
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL)
console.log('Site URL:', process.env.NEXT_PUBLIC_SITE_URL)
console.log('Node Environment:', process.env.NODE_ENV)
```

### **Build and test:**
```bash
# Build with production environment
npm run build

# Start production server
npm run start:server
```

## 🆘 Common Issues and Solutions

### **Issue 1: Variable is undefined**
**Solution:** Make sure you're using the correct prefix (`NEXT_PUBLIC_` for client-side)

### **Issue 2: Variable not updating**
**Solution:** Restart your development server after changing `.env` files

### **Issue 3: Build fails**
**Solution:** Check that all required variables are defined in `.env.production`

## 📞 Need Help?

If you're still confused about any part:

1. **Check the deployment guide** (`deployment-guide.md`)
2. **Look at the example files** I created
3. **Test with simple variables first** (like `NEXT_PUBLIC_SITE_URL`)
4. **Ask specific questions** about what you don't understand

Remember: Environment variables are just **configuration settings** that make your app flexible and secure! 🎯
