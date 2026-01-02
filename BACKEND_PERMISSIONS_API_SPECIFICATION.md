# Backend Permissions API Specification

**Purpose:** This document specifies the backend API endpoints required for the dynamic permissions system.

**Target Framework:** ASP.NET Core (C#)  
**Authentication:** JWT Bearer Token  
**Authorization:** Admin role required for all endpoints

---

## 📊 Database Schema

### **1. Permissions Table**

```sql
CREATE TABLE Permissions (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL UNIQUE, -- e.g., "users.create"
    DisplayName NVARCHAR(200) NOT NULL, -- e.g., "Create Users"
    Category NVARCHAR(50) NOT NULL, -- e.g., "Users", "Students", "News"
    Description NVARCHAR(500) NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME2 NULL
)

CREATE INDEX IX_Permissions_Category ON Permissions(Category)
CREATE INDEX IX_Permissions_IsActive ON Permissions(IsActive)
```

### **2. RolePermissions Table**

```sql
CREATE TABLE RolePermissions (
    Id INT PRIMARY KEY IDENTITY(1,1),
    RoleName NVARCHAR(50) NOT NULL, -- "Admin", "Staff", "Teacher", etc.
    PermissionId INT NOT NULL,
    IsGranted BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME2 NULL,
    FOREIGN KEY (PermissionId) REFERENCES Permissions(Id) ON DELETE CASCADE,
    UNIQUE(RoleName, PermissionId)
)

CREATE INDEX IX_RolePermissions_RoleName ON RolePermissions(RoleName)
CREATE INDEX IX_RolePermissions_PermissionId ON RolePermissions(PermissionId)
```

### **3. UserPermissions Table**

```sql
CREATE TABLE UserPermissions (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId NVARCHAR(450) NOT NULL,
    PermissionId INT NOT NULL,
    IsGranted BIT NOT NULL DEFAULT 1,
    GrantedBy NVARCHAR(450) NULL, -- Admin who granted this
    GrantedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME2 NULL,
    FOREIGN KEY (UserId) REFERENCES AspNetUsers(Id) ON DELETE CASCADE,
    FOREIGN KEY (PermissionId) REFERENCES Permissions(Id) ON DELETE CASCADE,
    FOREIGN KEY (GrantedBy) REFERENCES AspNetUsers(Id),
    UNIQUE(UserId, PermissionId)
)

CREATE INDEX IX_UserPermissions_UserId ON UserPermissions(UserId)
CREATE INDEX IX_UserPermissions_PermissionId ON UserPermissions(PermissionId)
```

---

## 🔌 API Endpoints

### **Base URL:** `/api/permissions`

All endpoints require:
- **Authentication:** JWT Bearer Token
- **Authorization:** `[Authorize(Roles = "Admin")]` or `[Authorize(Policy = "Permission:permissions.manage")]`

---

### **1. Get All Permissions**

```
GET /api/permissions
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "users.create",
    "displayName": "Create Users",
    "category": "Users",
    "description": "Allow user to create new user accounts",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z"
  },
  ...
]
```

**Query Parameters:**
- `category` (optional): Filter by category
- `isActive` (optional): Filter by active status (true/false)

---

### **2. Get Permission by ID**

```
GET /api/permissions/{id}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "users.create",
  "displayName": "Create Users",
  "category": "Users",
  "description": "Allow user to create new user accounts",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

**Error:** `404 Not Found` if permission doesn't exist

---

### **3. Get Permissions for Role**

```
GET /api/permissions/roles/{roleName}
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "roleName": "Staff",
    "permissionId": 1,
    "permission": {
      "id": 1,
      "name": "users.create",
      "displayName": "Create Users",
      "category": "Users"
    },
    "isGranted": true
  },
  ...
]
```

**URL Encoding:** Role name should be URL encoded (e.g., `Staff` → `Staff`, `Admin` → `Admin`)

---

### **4. Assign Permission to Role**

```
POST /api/permissions/roles/{roleName}
```

**Request Body:**
```json
{
  "permissionId": 1,
  "isGranted": true
}
```

**Response:** `200 OK`
```json
{
  "message": "Permission assigned to role successfully"
}
```

**Errors:**
- `400 Bad Request`: Invalid permission ID or role name
- `404 Not Found`: Permission or role doesn't exist

---

### **5. Bulk Assign Permissions to Role**

```
POST /api/permissions/roles/{roleName}/bulk
```

**Request Body:**
```json
{
  "permissionIds": [1, 2, 3, 4],
  "isGranted": true
}
```

**Response:** `200 OK`
```json
{
  "message": "Permissions assigned successfully",
  "assigned": 4
}
```

---

### **6. Get Permissions for User**

```
GET /api/permissions/users/{userId}
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "userId": "user-guid-123",
    "permissionId": 1,
    "permission": {
      "id": 1,
      "name": "users.create",
      "displayName": "Create Users",
      "category": "Users"
    },
    "isGranted": true,
    "grantedBy": "admin-guid-456",
    "grantedByUser": {
      "id": "admin-guid-456",
      "firstName": "Admin",
      "lastName": "User",
      "email": "admin@example.com"
    },
    "grantedAt": "2024-01-01T00:00:00Z"
  },
  ...
]
```

**Note:** This returns both role-based and custom user permissions. Custom permissions have `grantedBy` set.

---

### **7. Get Effective Permissions for User**

```
GET /api/permissions/users/{userId}/effective
```

**Response:** `200 OK`
```json
[
  "users.create",
  "users.update",
  "students.view",
  ...
]
```

**Logic:**
1. Get all permissions from user's roles (from `RolePermissions`)
2. Apply user-specific overrides (from `UserPermissions`)
3. Return list of permission names user actually has

---

### **8. Assign Permission to User**

```
POST /api/permissions/users/{userId}
```

**Request Body:**
```json
{
  "permissionId": 1,
  "isGranted": true
}
```

**Response:** `200 OK`
```json
{
  "message": "Permission assigned to user successfully"
}
```

**Note:** This creates a custom permission override. If `isGranted: false`, it denies the permission even if role has it.

---

### **9. Bulk Assign Permissions to User**

```
POST /api/permissions/users/{userId}/bulk
```

**Request Body:**
```json
{
  "permissionIds": [1, 2, 3],
  "isGranted": true
}
```

**Response:** `200 OK`
```json
{
  "message": "Permissions assigned successfully",
  "assigned": 3
}
```

---

### **10. Remove User Permission Override**

```
DELETE /api/permissions/users/{userId}/{permissionId}
```

**Response:** `200 OK`
```json
{
  "message": "User permission override removed successfully"
}
```

**Note:** This removes the custom override. User will fall back to role-based permissions.

---

### **11. Get Current User's Permissions**

```
GET /api/permissions/me
```

**Response:** `200 OK`
```json
[
  "users.create",
  "users.update",
  "students.view",
  ...
]
```

**Note:** Returns effective permissions for the authenticated user. Should also be included in JWT token claims.

---

## 🔐 Permission Resolution Logic

### **Algorithm:**

```csharp
public async Task<List<string>> GetEffectivePermissions(string userId)
{
    var user = await _userManager.FindByIdAsync(userId);
    var userRoles = await _userManager.GetRolesAsync(user);
    
    // 1. Get permissions from roles
    var rolePermissions = await _context.RolePermissions
        .Where(rp => userRoles.Contains(rp.RoleName) && rp.IsGranted)
        .Select(rp => rp.Permission.Name)
        .ToListAsync();
    
    // 2. Get user-specific overrides
    var userOverrides = await _context.UserPermissions
        .Where(up => up.UserId == userId)
        .Include(up => up.Permission)
        .ToListAsync();
    
    // 3. Build effective permissions set
    var effective = new HashSet<string>(rolePermissions);
    
    foreach (var override in userOverrides)
    {
        if (override.IsGranted)
        {
            effective.Add(override.Permission.Name);
        }
        else
        {
            effective.Remove(override.Permission.Name);
        }
    }
    
    // 4. Admin always has all permissions (system protection)
    if (userRoles.Contains("Admin"))
    {
        var allPermissions = await _context.Permissions
            .Where(p => p.IsActive)
            .Select(p => p.Name)
            .ToListAsync();
        return allPermissions;
    }
    
    return effective.ToList();
}
```

---

## 🎫 JWT Token Claims

### **Add Permissions to JWT:**

When generating JWT token, include permissions as claims:

```csharp
var permissions = await GetEffectivePermissions(user.Id);
foreach (var permission in permissions)
{
    claims.Add(new Claim("permission", permission));
}

// Or as a single claim with array
claims.Add(new Claim("permissions", string.Join(",", permissions)));
```

**Frontend expects:**
- `payload.permissions` (array) OR
- `payload.perm` (array) OR
- Multiple `permission` claims

---

## 📋 Default Permission Seeding

### **Seed Data Script:**

```sql
-- Insert default permissions
INSERT INTO Permissions (Name, DisplayName, Category, Description, IsActive) VALUES
-- User Management
('users.view', 'View Users', 'Users', 'View list of users', 1),
('users.create', 'Create Users', 'Users', 'Create new user accounts', 1),
('users.update', 'Update Users', 'Users', 'Update user information', 1),
('users.delete', 'Delete Users', 'Users', 'Delete user accounts', 1),
('users.activate', 'Activate Users', 'Users', 'Activate user accounts', 1),
('users.deactivate', 'Deactivate Users', 'Users', 'Deactivate user accounts', 1),
('users.assign_role', 'Assign Roles', 'Users', 'Assign roles to users', 1),
('users.remove_role', 'Remove Roles', 'Users', 'Remove roles from users', 1),

-- Student Management
('students.view', 'View Students', 'Students', 'View list of students', 1),
('students.create', 'Create Students', 'Students', 'Create new student records', 1),
('students.update', 'Update Students', 'Students', 'Update student information', 1),
('students.delete', 'Delete Students', 'Students', 'Delete student records', 1),

-- ... (add all permissions from PERMISSIONS constant)

-- Assign default permissions to Admin role (ALL permissions)
INSERT INTO RolePermissions (RoleName, PermissionId, IsGranted)
SELECT 'Admin', Id, 1 FROM Permissions WHERE IsActive = 1

-- Assign default permissions to Staff role
INSERT INTO RolePermissions (RoleName, PermissionId, IsGranted)
SELECT 'Staff', Id, 1 FROM Permissions 
WHERE Name IN (
    'users.view', 'users.create', 'users.update',
    'students.view', 'students.create', 'students.update',
    'guardians.view', 'guardians.create', 'guardians.update',
    'news.view', 'news.create', 'news.update',
    'events.view', 'events.create', 'events.update',
    'admissions.view', 'admissions.manage', 'admissions.approve',
    'registrations.view', 'registrations.manage', 'registrations.approve',
    'contacts.view', 'contacts.respond',
    'test_syllabus.view', 'test_syllabus.create', 'test_syllabus.update',
    'jobs.view', 'jobs.create', 'jobs.update'
)

-- ... (assign for other roles)
```

---

## 🔒 Authorization Policies

### **Create Permission-Based Policy:**

```csharp
// Startup.cs or Program.cs
services.AddAuthorization(options =>
{
    // Create policy for each permission dynamically
    var permissions = _context.Permissions.Where(p => p.IsActive).ToList();
    foreach (var permission in permissions)
    {
        options.AddPolicy($"Permission:{permission.Name}", policy =>
            policy.RequireAssertion(context =>
            {
                var user = context.User;
                var userRoles = user.Claims
                    .Where(c => c.Type == ClaimTypes.Role)
                    .Select(c => c.Value)
                    .ToList();
                
                // Admin has all permissions
                if (userRoles.Contains("Admin"))
                    return true;
                
                // Check if user has the permission
                var hasPermission = user.Claims
                    .Where(c => c.Type == "permission" || c.Type == "permissions")
                    .Any(c => c.Value == permission.Name || 
                             (c.Value.Contains(",") && c.Value.Split(',').Contains(permission.Name)));
                
                return hasPermission;
            }));
    }
});
```

### **Usage in Controllers:**

```csharp
[Authorize(Policy = "Permission:users.delete")]
public async Task<IActionResult> DeleteUser(string id)
{
    // ...
}
```

---

## ✅ Implementation Checklist

### **Backend Tasks:**

- [ ] Create database tables (Permissions, RolePermissions, UserPermissions)
- [ ] Create Permission entity model
- [ ] Create RolePermission entity model
- [ ] Create UserPermission entity model
- [ ] Create PermissionService with resolution logic
- [ ] Create PermissionsController with all endpoints
- [ ] Add permission claims to JWT token generation
- [ ] Create authorization policies for permissions
- [ ] Seed default permissions
- [ ] Seed default role-permission mappings
- [ ] Update existing controllers to use permission checks
- [ ] Add permission checks to all protected endpoints
- [ ] Test all endpoints
- [ ] Add logging/audit trail for permission changes

---

## 📝 Notes

1. **Admin Protection:** Admin role should always have all permissions (system protection)
2. **Performance:** Cache permissions in JWT token, refresh periodically
3. **Audit:** Log all permission assignments/changes
4. **Validation:** Validate permission IDs and user IDs before operations
5. **Error Handling:** Return clear error messages for debugging

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Status:** Ready for Backend Implementation

