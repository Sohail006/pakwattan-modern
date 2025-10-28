# ⚡ Quick SharkASP.net Deployment Guide

## 🚀 **5-Minute Deployment Steps**

### **Step 1: Upload Files (2 minutes)**
1. Go to: `https://member5.sharkasp.net/cp/cp_screen`
2. Open **File Manager**
3. Navigate to `/public_html/` (your domain root)
4. Upload all contents from `sharkasp-deployment` folder:
   ```
   ✅ .next/ (entire folder)
   ✅ public/ (entire folder)
   ✅ .htaccess
   ✅ server.js
   ✅ package.json
   ✅ ecosystem.config.js
   ✅ next.config.js
   ```

### **Step 2: Configure Node.js (2 minutes)**
1. Go to **"Node.js Applications"** in control panel
2. Click **"Create Application"**
3. Fill in:
   - **Name**: `pakwattan-modern`
   - **Startup File**: `server.js`
   - **Node.js Version**: 18+
   - **Port**: 3000
4. Click **"Create"**

### **Step 3: Set Environment Variables (1 minute)**
In your Node.js application settings:
```
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

### **Step 4: Start Application**
1. Click **"Start Application"** in control panel
2. Wait for status to show **"Running"**
3. Visit your domain to test

## 🧪 **Quick Test Checklist**

- [ ] Visit your domain - homepage loads
- [ ] Test navigation - all menu items work
- [ ] Check mobile - responsive design works
- [ ] Test forms - contact/admission forms work
- [ ] Verify images - all images load properly

## 🚨 **Common Issues & Quick Fixes**

### **Issue: Shows JavaScript code instead of website**
**Quick Fix**: 
1. Check Node.js app is "Running" in control panel
2. Restart the application
3. Verify `server.js` is startup file

### **Issue: 404 errors on page refresh**
**Quick Fix**:
1. Check `.htaccess` file is uploaded
2. Verify file permissions
3. Test rewrite rules

### **Issue: Images not loading**
**Quick Fix**:
1. Check `public` folder is uploaded
2. Verify image paths
3. Test image URLs directly

## 📞 **Need Help?**

- **SharkASP.net Support**: Use control panel support
- **Documentation**: Check deployment guide
- **Logs**: View application logs in control panel

---

**Your deployment package is ready in the `sharkasp-deployment` folder!**
