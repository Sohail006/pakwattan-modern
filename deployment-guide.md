# 🚀 PakWattanModern Deployment Guide for SharkASP.net

This guide will help you deploy your PakWattanModern Next.js application to SharkASP.net hosting at `https://member5.sharkasp.net/cp/cp_screen`.

## 📋 Prerequisites

1. **SharkASP.net Account**: Sign up for a hosting plan that supports Node.js
2. **Control Panel Access**: `https://member5.sharkasp.net/cp/cp_screen`
3. **FTP Client**: FileZilla, WinSCP, or similar (optional - can use File Manager)
4. **Domain**: Your domain should point to SharkASP.net
5. **Node.js**: Version 18+ (available on SharkASP.net)
6. **SSH Access**: For advanced configuration (if available)

## 🛠️ Step 1: Prepare Your Application

### 1.1 Update Environment Variables
Create a `.env.production` file in your project root:

```env
# Production Environment Variables for SharkASP.net
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://localhost:7210/api
NEXT_PUBLIC_SITE_URL=https://www.sharkasp.net
NEXT_PUBLIC_APP_NAME=Pak Wattan School & College of Sciences

# YouTube API Configuration (if needed)
YOUTUBE_API_KEY=your_youtube_api_key_here
YOUTUBE_CHANNEL_ID=UCpakwattanSchoolCollege

# Analytics (if using)
NEXT_PUBLIC_GA_ID=your_google_analytics_id_here
```

### 1.2 Build Your Application
```bash
# Navigate to project directory
cd "E:\Cursor AI\PakWattanModern"

# Install dependencies
npm install

# Build for production
npm run build
```

## 🚀 Step 2: Deploy to SharkASP.net

### 2.1 Access SharkASP.net Control Panel

1. **Go to:** `https://member5.sharkasp.net/cp/cp_screen`
2. **Login** with your SharkASP.net credentials
3. **Navigate to your hosting account** dashboard

### 2.2 Upload Files via File Manager or FTP

**Option A: Using File Manager (Recommended)**
1. **Go to File Manager** in your control panel
2. **Navigate to your domain's root directory** (usually `/public_html/` or `/www/`)
3. **Upload the following files and folders**:

**📁 Essential Files to Upload:**
```
✅ .next/ (entire folder - CRITICAL)
✅ public/ (entire folder)
✅ package.json
✅ package-lock.json
✅ server.js
✅ ecosystem.config.js
✅ next.config.js
✅ node_modules/ (if you want to upload dependencies)
```

**🚫 Files to Skip:**
```
❌ .git/ (version control)
❌ app/ (source code - not needed for production)
❌ components/ (source code - not needed for production)
❌ lib/ (source code - not needed for production)
❌ *.md files (documentation)
❌ tsconfig.json (TypeScript config)
❌ tailwind.config.js (build config)
❌ postcss.config.js (build config)
```

**Option B: Using FTP Client**
1. **Connect to your SharkASP.net server** using FTP credentials
2. **Navigate to your domain's root directory** (usually `/public_html/` or `/www/`)
3. **Upload the files listed above**

### 2.3 Configure Node.js Application in Control Panel

**In your SharkASP.net control panel:**

1. **Go to "Node.js" or "Applications" section**
2. **Create a new Node.js application:**
   - **Application Name:** `pakwattan-modern`
   - **Startup File:** `server.js`
   - **Node.js Version:** 18+ (latest available)
   - **Port:** 3000 (or auto-assigned)
   - **Environment:** Production

3. **Set Environment Variables:**
   ```
   NODE_ENV=production
   PORT=3000
   HOSTNAME=0.0.0.0
   ```

### 2.4 SSH Configuration (Alternative Method)

**If you have SSH access, run these commands:**

```bash
# 1. Connect to your server via SSH
ssh your-username@your-server-ip

# 2. Navigate to your project directory
cd /path/to/your/domain/public_html

# 3. Install dependencies
npm install

# 4. Install PM2 globally
npm install -g pm2

# 5. Start your application
pm2 start ecosystem.config.js

# 6. Save PM2 configuration
pm2 save

# 7. Set up auto-start
pm2 startup

# 8. Check status
pm2 status
```

### 2.5 Create .htaccess File for Apache

**Create a `.htaccess` file in your root directory:**

```apache
RewriteEngine On

# Handle Next.js routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Security headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"

# Cache static assets
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
</FilesMatch>
```

## 🔧 Step 3: Configure Domain and SSL

### 3.1 Domain Configuration in Control Panel

**In your SharkASP.net control panel:**

1. **Go to "Domains" section**
2. **Configure your domain:**
   - **Domain:** Your domain name
   - **Document Root:** `/public_html/`
   - **SSL Certificate:** Enable Let's Encrypt or upload your certificate

3. **Set up redirects** from www to non-www (or vice versa)

### 3.2 SSL Certificate Configuration

1. **Enable SSL** in your SharkASP.net control panel
2. **Choose SSL option:**
   - **Let's Encrypt** (free, automatic renewal)
   - **Custom SSL Certificate** (if you have one)
3. **Force HTTPS** redirects
4. **Test SSL** configuration

## 🗄️ Step 4: Backend API Integration

### 4.1 Deploy ASP.NET MVC API
1. **Publish your API** from Visual Studio
2. **Upload API files** to `/api/` directory on server
3. **Configure IIS** to serve the API
4. **Update API endpoints** in your Next.js app

### 4.2 Database Configuration
1. **Set up SQL Server** or MySQL database
2. **Update connection strings** in your API
3. **Test database connectivity**

## ✅ Step 4: Testing and Verification

### 4.1 Test Your Deployment

**Test your deployment by:**

1. **Visit your domain** in a browser
2. **Check all pages load correctly:**
   - Homepage
   - About page
   - Contact page
   - All other pages

3. **Verify functionality:**
   - Navigation works
   - Images load
   - Forms work
   - Mobile responsiveness

4. **Check performance:**
   - Page load speed
   - No console errors
   - All assets loading

### 4.2 Troubleshooting Common Issues

**Issue**: Server shows raw JavaScript code instead of website
**Solution**: 
- Check Node.js application is running in control panel
- Verify `server.js` is the startup file
- Restart the Node.js application

**Issue**: 404 errors on page refresh
**Solution**: 
- Ensure `.htaccess` file is uploaded
- Check Apache rewrite rules are working

**Issue**: API calls failing
**Solution**: 
- Check CORS settings and API endpoints
- Verify API URL in environment variables

**Issue**: Images not loading
**Solution**: 
- Verify image paths and domains in next.config.js
- Check public folder is uploaded correctly

**Issue**: Slow loading
**Solution**: 
- Enable compression in control panel
- Optimize images before upload
- Check server resources

### 4.3 SharkASP.net Specific Troubleshooting

**If you still see raw JavaScript code:**

1. **Check Node.js application status:**
   - Go to control panel → Node.js applications
   - Verify your app is "Running"
   - Check application logs for errors

2. **Restart application:**
   - Stop and start your Node.js application
   - Or restart via SSH: `pm2 restart pakwattan-modern`

3. **Verify file permissions:**
   - Ensure all files have correct permissions
   - Check that `server.js` is executable

4. **Check logs:**
   - View application logs in control panel
   - Look for any error messages

## 📊 Step 5: Performance Optimization

### 5.1 Enable Caching in Control Panel

**In your SharkASP.net control panel:**

1. **Go to "Caching" or "Performance" section**
2. **Enable caching options:**
   - Browser caching
   - Static file caching
   - Database query caching

### 5.2 Optimize Images

- Use Next.js Image component
- Compress images before upload
- Consider using a CDN
- Enable image optimization in control panel

### 5.3 Monitor Performance

- Set up Google Analytics
- Use monitoring tools
- Regular performance audits
- Check server resources in control panel

## 🔒 Step 6: Security Considerations

### 6.1 Environment Variables
- Never commit `.env` files to version control
- Use strong, unique passwords
- Rotate API keys regularly
- Set environment variables in control panel

### 6.2 HTTPS Configuration
- Force HTTPS redirects in control panel
- Use secure cookies
- Implement CSP headers in `.htaccess`
- Enable SSL in SharkASP.net control panel

### 6.3 Regular Updates
- Keep dependencies updated
- Monitor security advisories
- Regular backups via control panel
- Update Node.js version when available

## 📞 Support and Troubleshooting

### SharkASP.net Support
- **Control Panel**: `https://member5.sharkasp.net/cp/cp_screen`
- **Support Tickets**: Submit tickets for technical issues
- **Documentation**: Check SharkASP.net documentation
- **Live Chat**: Available in control panel

### Common Commands (SSH Access)
```bash
# Check application status
pm2 status

# View logs
pm2 logs pakwattan-modern

# Restart application
pm2 restart pakwattan-modern

# Stop application
pm2 stop pakwattan-modern

# Delete application
pm2 delete pakwattan-modern
```

### Control Panel Commands
- **Node.js Applications**: Manage your Node.js apps
- **File Manager**: Upload and manage files
- **Logs**: View application and error logs
- **Backups**: Create and restore backups

## 🎉 Success!

Once deployed, your PakWattanModern application should be accessible at your domain. The modern, responsive design will provide an excellent user experience for students, parents, and staff of Pak Wattan School & College of Sciences.

### ✅ Deployment Checklist
- [ ] Files uploaded to SharkASP.net server
- [ ] Node.js application configured in control panel
- [ ] `.htaccess` file created for Apache routing
- [ ] SSL certificate enabled
- [ ] Domain configured properly
- [ ] Application running without errors
- [ ] All pages loading correctly
- [ ] Mobile responsiveness working
- [ ] Performance optimized

### Next Steps
1. **Monitor performance** and user feedback
2. **Regular updates** and maintenance via control panel
3. **Content updates** as needed
4. **Feature enhancements** based on user needs
5. **Regular backups** via SharkASP.net control panel

### 🚀 Quick Access Links
- **Control Panel**: `https://member5.sharkasp.net/cp/cp_screen`
- **File Manager**: Upload and manage files
- **Node.js Apps**: Manage your application
- **Logs**: Monitor application performance
- **Backups**: Create and restore backups

---

**Need Help?** 
- **SharkASP.net Support**: Contact via control panel
- **Documentation**: Check SharkASP.net documentation
- **Live Chat**: Available in control panel
- **Support Tickets**: Submit technical issues
