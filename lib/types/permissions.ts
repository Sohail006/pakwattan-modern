// Permission Types and Definitions

export interface Permission {
  id: number;
  name: string; // e.g., "users.create"
  displayName: string; // e.g., "Create Users"
  category: string; // e.g., "Users", "Students", "News"
  description?: string;
  isActive: boolean;
  createdAt?: string;
}

export interface RolePermission {
  id: number;
  roleName: string; // "Admin", "Staff", "Teacher", etc.
  permissionId: number;
  permission?: Permission;
  isGranted: boolean;
}

export interface UserPermission {
  id: number;
  userId: string;
  permissionId: number;
  permission?: Permission;
  isGranted: boolean;
  grantedBy?: string;
  grantedByUser?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  grantedAt: string;
}

export interface PermissionCategory {
  name: string;
  displayName: string;
  permissions: Permission[];
}

export interface AssignPermissionRequest {
  permissionId: number;
  isGranted: boolean;
}

export interface BulkAssignPermissionRequest {
  permissionIds: number[];
  isGranted: boolean;
}

// Permission Name Constants (for type safety)
export const PERMISSIONS = {
  // User Management
  USERS_VIEW: 'users.view',
  USERS_CREATE: 'users.create',
  USERS_UPDATE: 'users.update',
  USERS_DELETE: 'users.delete',
  USERS_ACTIVATE: 'users.activate',
  USERS_DEACTIVATE: 'users.deactivate',
  USERS_ASSIGN_ROLE: 'users.assign_role',
  USERS_REMOVE_ROLE: 'users.remove_role',
  
  // Student Management
  STUDENTS_VIEW: 'students.view',
  STUDENTS_CREATE: 'students.create',
  STUDENTS_UPDATE: 'students.update',
  STUDENTS_DELETE: 'students.delete',
  STUDENTS_EXPORT: 'students.export',
  STUDENTS_IMPORT: 'students.import',
  
  // Guardian Management
  GUARDIANS_VIEW: 'guardians.view',
  GUARDIANS_CREATE: 'guardians.create',
  GUARDIANS_UPDATE: 'guardians.update',
  GUARDIANS_DELETE: 'guardians.delete',
  
  // Teacher Management
  TEACHERS_VIEW: 'teachers.view',
  TEACHERS_CREATE: 'teachers.create',
  TEACHERS_UPDATE: 'teachers.update',
  TEACHERS_DELETE: 'teachers.delete',
  
  // News Management
  NEWS_VIEW: 'news.view',
  NEWS_CREATE: 'news.create',
  NEWS_UPDATE: 'news.update',
  NEWS_DELETE: 'news.delete',
  NEWS_PUBLISH: 'news.publish',
  
  // Events Management
  EVENTS_VIEW: 'events.view',
  EVENTS_CREATE: 'events.create',
  EVENTS_UPDATE: 'events.update',
  EVENTS_DELETE: 'events.delete',
  
  // Admissions Management
  ADMISSIONS_VIEW: 'admissions.view',
  ADMISSIONS_MANAGE: 'admissions.manage',
  ADMISSIONS_APPROVE: 'admissions.approve',
  ADMISSIONS_REJECT: 'admissions.reject',
  
  // Registration Management
  REGISTRATIONS_VIEW: 'registrations.view',
  REGISTRATIONS_MANAGE: 'registrations.manage',
  REGISTRATIONS_APPROVE: 'registrations.approve',
  
  // Contact Messages
  CONTACTS_VIEW: 'contacts.view',
  CONTACTS_RESPOND: 'contacts.respond',
  CONTACTS_DELETE: 'contacts.delete',
  
  // Model Papers
  TEST_SYLLABUS_VIEW: 'test_syllabus.view',
  TEST_SYLLABUS_CREATE: 'test_syllabus.create',
  TEST_SYLLABUS_UPDATE: 'test_syllabus.update',
  TEST_SYLLABUS_DELETE: 'test_syllabus.delete',
  
  // Jobs Management
  JOBS_VIEW: 'jobs.view',
  JOBS_CREATE: 'jobs.create',
  JOBS_UPDATE: 'jobs.update',
  JOBS_DELETE: 'jobs.delete',
  
  // Settings Management
  SETTINGS_VIEW: 'settings.view',
  SETTINGS_MANAGE: 'settings.manage',
  SETTINGS_ADMISSION: 'settings.admission',
  
  // Permissions Management (Admin only)
  PERMISSIONS_VIEW: 'permissions.view',
  PERMISSIONS_MANAGE: 'permissions.manage',
  PERMISSIONS_ASSIGN: 'permissions.assign',
  
  // Activity Logs
  ACTIVITY_LOGS_VIEW: 'activity_logs.view',
  
  // Reports
  REPORTS_VIEW: 'reports.view',
  REPORTS_GENERATE: 'reports.generate',
  REPORTS_EXPORT: 'reports.export',
  
  // Dashboard Access
  STAFF_DASHBOARD_ACCESS: 'dashboard.staff',
  ADMIN_DASHBOARD_ACCESS: 'dashboard.admin',
  TEACHER_DASHBOARD_ACCESS: 'dashboard.teacher',
  STUDENT_DASHBOARD_ACCESS: 'dashboard.student',
  PARENT_DASHBOARD_ACCESS: 'dashboard.parent',
} as const;

export type PermissionName = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Permission Categories
export const PERMISSION_CATEGORIES = {
  USERS: 'Users',
  STUDENTS: 'Students',
  GUARDIANS: 'Guardians',
  NEWS: 'News',
  EVENTS: 'Events',
  ADMISSIONS: 'Admissions',
  REGISTRATIONS: 'Registrations',
  CONTACTS: 'Contacts',
  TEST_SYLLABUS: 'Model Papers',
  JOBS: 'Jobs',
  SETTINGS: 'Settings',
  PERMISSIONS: 'Permissions',
  ACTIVITY_LOGS: 'Activity Logs',
  REPORTS: 'Reports',
} as const;

