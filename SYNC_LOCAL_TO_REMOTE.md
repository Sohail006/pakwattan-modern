# 🔄 How to Sync Local Changes to Remote Server

## 🔍 **Why Local and Remote Are Different**

There are several reasons why your local changes aren't showing on the remote server:

### **1. Changes Not Committed to Git** ❌
- Files modified locally but not committed
- Files not added to git staging area

### **2. Changes Not Pushed to GitHub** ❌
- Committed locally but not pushed to remote repository
- Remote repository is behind

### **3. Remote Server Not Connected to Git** ⚠️
- Server might be manually deployed (not using git pull)
- Server needs manual file upload
- Server might not have auto-deployment set up

### **4. Environment Variables Different** ⚠️
- `.env.local` is gitignored (correctly)
- Remote server needs its own environment variables
- Remote server might have old environment variables

### **5. Build Not Updated** ⚠️
- Remote server might be running old build
- Need to rebuild and upload `.next` folder

---

## ✅ **Step-by-Step Solution**

### **Step 1: Check What's Not Committed**

```bash
# See all uncommitted changes
git status

# See what files changed
git diff --name-only
```

### **Step 2: Commit All Changes**

```bash
# Add all changes
git add .

# Commit with message
git commit -m "Your commit message describing the changes"

# Push to GitHub
git push origin main
```

### **Step 3: Verify Changes Are on GitHub**

1. Go to: `https://github.com/Sohail006/pakwattan-modern`
2. Check the latest commit
3. Verify all files are updated

### **Step 4: Update Remote Server**

**Option A: If Server Uses Git (Auto-Deploy)**

```bash
# SSH into your server
ssh your-username@your-server

# Navigate to project directory
cd /path/to/your/project

# Pull latest changes
git pull origin main

# Install dependencies (if needed)
npm install

# Rebuild
npm run build

# Restart application
pm2 restart pakwattan-modern
# OR
npm start
```

**Option B: If Server Uses Manual Deployment**

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Upload these files/folders to server:**
   - `.next/` (entire folder - CRITICAL)
   - `public/` (entire folder)
   - `package.json`
   - `server.js`
   - `next.config.js`
   - Any other config files

3. **On server, restart the application**

### **Step 5: Update Environment Variables on Remote Server**

**Create/Update `.env.production` or set in hosting control panel:**

```env
NODE_ENV=production
NEXT_PUBLIC_BACKEND_BASE_URL=https://sohailghsno4-001-site8.rtempurl.com
NEXT_PUBLIC_SITE_URL=https://pakwattan.edu.pk
NEXT_PUBLIC_APP_NAME=Pak Wattan School & College of Sciences
```

**Important:** The remote server needs its own environment variables. The `.env.local` file is only for local development.

---

## 🔧 **Quick Fix Commands**

### **Commit and Push All Changes:**

```bash
# Add all changes
git add .

# Commit
git commit -m "Sync local changes to remote"

# Push to GitHub
git push origin main
```

### **Check What's Different:**

```bash
# See uncommitted changes
git status

# See what's different from remote
git diff origin/main

# See commit history
git log --oneline -10
```

---

## 📋 **Checklist Before Deployment**

- [ ] All changes committed to git
- [ ] All changes pushed to GitHub
- [ ] Build completed successfully (`npm run build`)
- [ ] Environment variables set on remote server
- [ ] Files uploaded to remote server (if manual deployment)
- [ ] Application restarted on remote server
- [ ] Tested on remote server

---

## 🚨 **Common Issues**

### **Issue: Changes committed but not on server**

**Solution:**
- Server might not be pulling from git
- Need to manually upload files
- Check if server has auto-deployment enabled

### **Issue: Environment variables not working**

**Solution:**
- `.env.local` is gitignored (won't be on server)
- Set environment variables in hosting control panel
- Or create `.env.production` file on server

### **Issue: Build errors on server**

**Solution:**
- Build locally first: `npm run build`
- Upload the `.next` folder
- Ensure Node.js version matches (18+)

---

## 💡 **Best Practices**

1. **Always commit and push before deploying**
2. **Test locally before deploying**
3. **Keep environment variables separate** (local vs production)
4. **Document deployment process**
5. **Use version control** (git) for all code changes

---

## 🔗 **Useful Commands**

```bash
# See current branch
git branch

# See remote repositories
git remote -v

# See what's on remote but not local
git fetch
git log HEAD..origin/main

# Force push (use with caution!)
git push origin main --force
```

