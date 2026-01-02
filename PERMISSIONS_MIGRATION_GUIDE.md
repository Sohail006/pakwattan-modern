# Permissions System - Migration Guide

**Purpose:** Guide for migrating existing code from role-based to permission-based checks

---

## 🔄 Migration Strategy

### **Phase 1: Parallel System (Recommended)**
- Keep both role checks and permission checks
- Gradually migrate components
- Test thoroughly before removing role checks

### **Phase 2: Full Migration**
- Replace all role checks with permission checks
- Remove role-based authorization
- Use permissions exclusively

---

## 📝 Migration Steps

### **Step 1: Import Permission Helpers**

```typescript
import { hasPermission, hasAnyPermission, canPerform } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'
```

### **Step 2: Replace Role Checks**

**Before:**
```typescript
const userRoles = getUserRoles()
const isAdmin = userRoles.includes('Admin')
const canManage = userRoles.includes('Admin') || userRoles.includes('Staff')
```

**After:**
```typescript
const canDelete = hasPermission(PERMISSIONS.USERS_DELETE)
const canManage = hasAnyPermission(
  PERMISSIONS.USERS_CREATE,
  PERMISSIONS.USERS_UPDATE,
  PERMISSIONS.USERS_DELETE
)
```

### **Step 3: Update Conditional Rendering**

**Before:**
```typescript
{isAdmin && <DeleteButton />}
```

**After:**
```typescript
{hasPermission(PERMISSIONS.USERS_DELETE) && <DeleteButton />}
```

### **Step 4: Update API Calls**

**Before:**
```typescript
// Comment says "Admin only"
await deleteUser(userId)
```

**After:**
```typescript
// Permission check happens in component
if (!hasPermission(PERMISSIONS.USERS_DELETE)) {
  alert('You do not have permission to delete users')
  return
}
await deleteUser(userId)
```

---

## 📋 Component Migration Checklist

For each component that needs migration:

- [ ] Identify all role checks
- [ ] Map roles to permissions
- [ ] Replace role checks with permission checks
- [ ] Update conditional rendering
- [ ] Test with different user types
- [ ] Verify UI shows/hides correctly
- [ ] Test permission denied scenarios

---

## 🎯 Common Patterns

### **Pattern 1: Simple Permission Check**

```typescript
// Single permission
const canCreate = hasPermission(PERMISSIONS.USERS_CREATE)
```

### **Pattern 2: Multiple Permissions (Any)**

```typescript
// User needs at least one permission
const canManage = hasAnyPermission(
  PERMISSIONS.USERS_CREATE,
  PERMISSIONS.USERS_UPDATE
)
```

### **Pattern 3: Multiple Permissions (All)**

```typescript
// User needs all permissions
const canFullManage = hasAllPermissions(
  PERMISSIONS.USERS_CREATE,
  PERMISSIONS.USERS_UPDATE,
  PERMISSIONS.USERS_DELETE
)
```

### **Pattern 4: Permission OR Role (Backward Compatible)**

```typescript
// Support both during migration
const canAccess = canPerform(
  PERMISSIONS.USERS_MANAGE,
  ['Admin', 'Staff'] // Fallback roles
)
```

---

## 🔍 Finding Components to Migrate

Search for these patterns:
- `userRoles.includes('Admin')`
- `userRoles.includes('Staff')`
- `getUserRoles()`
- `isAdmin`
- `canManage`
- Comments like "Admin only", "Staff only"

---

## ⚠️ Important Notes

1. **Admin Always Has All Permissions**
   - Admin role check is built into `hasPermission()`
   - No need to check `isAdmin` separately

2. **Backward Compatibility**
   - Can use both systems during migration
   - `canPerform()` supports both permissions and roles

3. **Performance**
   - Permissions are cached in JWT token
   - No additional API calls needed for checks

4. **Security**
   - Always verify permissions on backend
   - Frontend checks are for UI only
   - Never trust client-side permission checks

---

**Migration Guide Complete** ✅

