# Permissions Migration - Round 2 (Additional Components)

**Date:** 2024  
**Status:** ✅ Additional Components Updated

---

## ✅ Additional Components Updated

### **8. Students Management** (`app/dashboard/students/page.tsx`)

**Changes:**
- ✅ Replaced `canManage` role check with `PERMISSIONS.STUDENTS_VIEW`
- ✅ Uses `canPerform()` with role fallback for backward compatibility

**Permission Added:**
- `PERMISSIONS.STUDENTS_VIEW` - View students page

---

### **9. Teachers Management** (`app/dashboard/teachers/page.tsx`)

**Changes:**
- ✅ Replaced `isAdmin` checks with permission-based checks
- ✅ Added permission checks for:
  - `PERMISSIONS.TEACHERS_UPDATE` - Edit teacher button
  - `PERMISSIONS.TEACHERS_DELETE` - Delete teacher button
  - `PERMISSIONS.USERS_ASSIGN_ROLE` - Role assignment (removed, not used in this component)

**UI Updates:**
- Edit button conditionally rendered based on update permission
- Delete button conditionally rendered based on delete permission

---

### **10. Admissions Management** (`app/dashboard/admissions/page.tsx`)

**Changes:**
- ✅ Replaced `canManage` role check with `PERMISSIONS.ADMISSIONS_VIEW`
- ✅ Uses `canPerform()` with role fallback

**Permission Added:**
- `PERMISSIONS.ADMISSIONS_VIEW` - View admissions page

---

### **11. Registrations Management** (`app/dashboard/registrations/page.tsx`)

**Changes:**
- ✅ Replaced `canManage` role check with `PERMISSIONS.REGISTRATIONS_VIEW`
- ✅ Uses `canPerform()` with role fallback

**Permission Added:**
- `PERMISSIONS.REGISTRATIONS_VIEW` - View registrations page

---

### **12. Admission Settings** (`app/dashboard/admission-settings/page.tsx`)

**Changes:**
- ✅ Replaced `canManage` role check with `PERMISSIONS.ADMISSION_SETTINGS_MANAGE`
- ✅ Uses `canPerform()` with role fallback (Admin, ManagerialStaff)

**Permission Added:**
- `PERMISSIONS.ADMISSION_SETTINGS_MANAGE` - Manage admission settings

---

### **13. Job Applications** (`app/dashboard/jobs/page.tsx`)

**Changes:**
- ✅ Replaced `canManage` role check with `PERMISSIONS.JOBS_VIEW`
- ✅ Uses `canPerform()` with role fallback

**Permission Added:**
- `PERMISSIONS.JOBS_VIEW` - View job applications page

---

### **14. Test Syllabus** (`app/dashboard/test-syllabus/page.tsx`)

**Changes:**
- ✅ Replaced role-based access check with `PERMISSIONS.TEST_SYLLABUS_VIEW`
- ✅ Uses `canPerform()` with role fallback (Admin, Staff, ManagerialStaff)

**Permission Added:**
- `PERMISSIONS.TEST_SYLLABUS_VIEW` - View test syllabus page

---

### **15. Create User Page** (`app/dashboard/users/create/page.tsx`)

**Changes:**
- ✅ Replaced `isStaff` role check with permission-based logic
- ✅ Added permission checks for:
  - `PERMISSIONS.USERS_CREATE` - Create user permission
- ✅ Dynamic role list based on permissions:
  - If can create Admin: Shows all roles
  - If can create Staff: Shows Staff, Teacher, Student, Parent
  - Otherwise: Shows Teacher, Student, Parent

**Logic:**
```typescript
const canCreateAdmin = canPerform(PERMISSIONS.USERS_CREATE, ['Admin']) && 
                       currentUserRoles.includes('Admin')
const canCreateStaff = canPerform(PERMISSIONS.USERS_CREATE, ['Admin', 'Staff'])

const roles = canCreateAdmin
  ? ['Admin', 'Staff', 'Teacher', 'Student', 'Parent']
  : canCreateStaff
  ? ['Staff', 'Teacher', 'Student', 'Parent']
  : ['Teacher', 'Student', 'Parent']
```

---

## 📊 Summary

**Round 2 Components Updated:** 8  
**Total Components Updated (Round 1 + Round 2):** 15  
**Total Permission Checks Added:** ~35+  
**Status:** ✅ All Major Components Migrated

---

## 🔄 Migration Pattern

All components follow the same pattern:

```typescript
// Import permission helpers
import { canPerform } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'

// Define permission checks with role fallback
const canView = canPerform(PERMISSIONS.RESOURCE_VIEW, ['Admin', 'Staff'])
const canCreate = canPerform(PERMISSIONS.RESOURCE_CREATE, ['Admin', 'Staff'])
const canUpdate = canPerform(PERMISSIONS.RESOURCE_UPDATE, ['Admin', 'Staff'])
const canDelete = canPerform(PERMISSIONS.RESOURCE_DELETE, ['Admin'])

// Use in conditional rendering
{canCreate && <CreateButton />}
{canUpdate && <EditButton />}
{canDelete && <DeleteButton />}
```

---

## ✅ Testing Checklist

For each migrated component:

- [x] Permission checks imported correctly
- [x] Permission constants used correctly
- [x] Role fallback included for backward compatibility
- [x] UI elements conditionally rendered based on permissions
- [x] No linter errors
- [ ] Test with different user roles (after backend implementation)
- [ ] Test with custom permissions (after backend implementation)
- [ ] Verify buttons show/hide correctly

---

## 📝 Notes

1. **Backward Compatibility:** All permission checks use `canPerform()` with role fallback, ensuring existing role-based access continues to work.

2. **Admin Protection:** Admin role automatically has all permissions (handled in `hasPermission()` function).

3. **Future Work:** Once backend is implemented, these components will automatically use dynamic permissions. No code changes needed.

4. **Role Filtering:** The Create User page now dynamically filters available roles based on permissions, providing more granular control.

---

## 🎯 Complete Migration Status

**Total Components Updated:** 15  
**Total Permission Checks Added:** ~35+  
**Status:** ✅ Ready for Backend Integration

All major dashboard components have been migrated to use permission-based checks while maintaining backward compatibility with role-based access.

---

**Round 2 Migration Complete** ✅

