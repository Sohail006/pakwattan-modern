# Quick Start Guide - Pak Wattan Projects

## 📁 Project Structure

```
E:\Cursor AI\
├── PakWattanAPI\          ← Backend (.NET/C#)
│   └── Uses: dotnet commands
│
└── PakWattanModern\       ← Frontend (Next.js/React)
    └── Uses: npm commands
```

---

## 🚀 Starting the Projects

### **Backend (API Server)**

```powershell
# Navigate to backend directory
cd "E:\Cursor AI\PakWattanAPI"

# Build the project
dotnet build

# Run the API server
dotnet run
```

**Backend will run on:**
- HTTPS: `https://localhost:7210`
- HTTP: `http://localhost:5000`

---

### **Frontend (Web Application)**

```powershell
# Navigate to frontend directory
cd "E:\Cursor AI\PakWattanModern"

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

**Frontend will run on:**
- `http://localhost:3000`

---

## ⚠️ Common Error: Wrong Directory

**Error:**
```
npm ERR! code ENOENT
npm ERR! path E:\Cursor AI\PakWattanAPI\package.json
```

**Cause:** You're running `npm` commands in the backend directory.

**Solution:** 
- Make sure you're in `E:\Cursor AI\PakWattanModern` (frontend directory)
- Backend uses `dotnet` commands, NOT `npm`

---

## ✅ Quick Commands Reference

### Backend Commands (PakWattanAPI)
```powershell
cd "E:\Cursor AI\PakWattanAPI"
dotnet build          # Build project
dotnet run            # Run server
dotnet test           # Run tests
dotnet clean          # Clean build files
```

### Frontend Commands (PakWattanModern)
```powershell
cd "E:\Cursor AI\PakWattanModern"
npm install           # Install dependencies
npm run dev           # Start dev server
npm run build         # Build for production
npm run lint          # Check code quality
```

---

## 🧪 Testing Contact Messages Module

### 1. Start Backend
```powershell
cd "E:\Cursor AI\PakWattanAPI"
dotnet run
```

### 2. Start Frontend (in a new terminal)
```powershell
cd "E:\Cursor AI\PakWattanModern"
npm run dev
```

### 3. Test URLs
- Frontend: http://localhost:3000
- Contact Form: http://localhost:3000/contact
- Admin Dashboard: http://localhost:3000/dashboard/admin
- Contact Messages: http://localhost:3000/dashboard/contact-messages

---

## 📝 Current Status

✅ **Backend:** Built successfully (0 errors)  
✅ **Frontend:** Dev server starting...  
✅ **Contact Messages Module:** Fully implemented

---

**Remember:** 
- Backend = `dotnet` commands
- Frontend = `npm` commands

