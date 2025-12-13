# Jobs Controller Analysis & Implementation Plan

## 📋 Overview

This document analyzes the `JobsController` from the PakWattanSrvices project and outlines the implementation plan for integrating job opportunities functionality into both the PakWattanModern frontend and PakWattanAPI backend.

---

## 🔍 Current JobsController Analysis

### **Source Location**
- **File**: `E:\Cursor AI\PakWattanSrvices\Web\Controllers\JobsController.cs`
- **Framework**: ASP.NET MVC (Legacy)
- **Pattern**: MVC Controller with View-based responses

### **Controller Endpoints**

#### 1. **Index** (GET)
- **Route**: `/Jobs`
- **Purpose**: Main jobs page view
- **Returns**: View

#### 2. **SaveAppliedJob** (GET)
- **Route**: `/Jobs/SaveAppliedJob`
- **Purpose**: Display job application form
- **Returns**: View with `JobOpportunityModels`
- **Features**:
  - Initializes ViewBag with Gender types
  - Displays job opportunity form

#### 3. **SaveAppliedJob** (POST)
- **Route**: `/Jobs/SaveAppliedJob`
- **Method**: POST
- **Authorization**: `[AllowAnonymous]` - Public endpoint
- **Purpose**: Submit job application
- **Request**: `JobOpportunityModels`
- **Response**: JSON
  - Success: `{ RegistrationModel, Status: "Success", Message }`
  - Error: `{ Status: "Error", Message }`
- **Business Logic**:
  - Validates model state
  - Converts model to `JobOpportunityData` contract
  - Sets `CreationDate` using `Util.SaveAccurateDate(DateTime.Now)`
  - Calls `serviceHelper.SaveAppliedJob(request)`
  - Returns success message: "Thank you for becoming a part of Pak Wattan. Your registration was successful. The School Administration will get in touch with you shortly to schedule an interview."

#### 4. **GetAppliedJobsList** (GET)
- **Route**: `/Jobs/GetAppliedJobsList`
- **Authorization**: `[CustomAuthorize]` - Requires authentication
- **Purpose**: Retrieve list of all job applications
- **Returns**: View with list of `JobOpportunityModels`
- **Business Logic**:
  - Calls `serviceHelper.GetAppliedJobsList(new GetAppliedJobsListRequest { })`
  - Orders by `CreationDate` (ascending)
  - Stores in Session: `Session["AppliedJobsList"]`
  - Displays flash messages for errors

#### 5. **PrintAppliedJobsList** (GET)
- **Route**: `/Jobs/PrintAppliedJobsList`
- **Purpose**: Generate PDF of job applications list
- **Returns**: PDF using Rotativa library
- **Features**:
  - Retrieves data from Session
  - A4 Portrait format
  - Custom margins (5mm all sides)

---

## 📊 Data Model Analysis

### **JobOpportunityModels** (View Model)
```csharp
public class JobOpportunityModels
{
    public int JobOpportunitiesID { get; set; }
    public string Name { get; set; }
    public string FatherName { get; set; }
    public int? Gender { get; set; }
    public string MobileNumber { get; set; }
    public string WhatsAppNumber { get; set; }
    public int? FieldExperiencedInYears { get; set; }
    public string SubjectTought { get; set; }
    public string PackageDemand { get; set; }
    public DateTime? DOB { get; set; }
    public DateTime? CreationDate { get; set; }
    public DateTime? ModificationDate { get; set; }
}
```

### **JobOpportunityData** (Contract/Data Transfer Object)
- Same structure as `JobOpportunityModels`
- Used for service layer communication

### **Database Entity** (`JobOpportunity`)
- Table: `JobOpportunity`
- Primary Key: `JobOpportunitiesID`
- All fields are nullable except `Name`, `FatherName`, `MobileNumber`

---

## 🎯 Implementation Requirements

### **Backend (PakWattanAPI) - .NET Core**

#### **1. Database Model**
**File**: `PakWattanAPI/Models/JobOpportunity.cs`
- Create new model class
- Properties matching the legacy structure
- Use Entity Framework Core attributes
- Add `IsActive` flag for soft delete (following existing pattern)
- Add audit fields: `CreatedAt`, `UpdatedAt`, `CreatedByUserId`, `UpdatedByUserId`

#### **2. Database Context**
**File**: `PakWattanAPI/Data/ApplicationDbContext.cs`
- Add `DbSet<JobOpportunity> JobOpportunities { get; set; }`
- Configure entity relationships if needed
- Add indexes for performance

#### **3. DTOs**
**File**: `PakWattanAPI/DTOs/Jobs/JobDtos.cs`
- `JobOpportunityCreateDto` - For creating new applications
- `JobOpportunityUpdateDto` - For updating applications (optional)
- `JobOpportunityResponseDto` - For API responses
- Include validation attributes

#### **4. Service Interface & Implementation**
**Files**: 
- `PakWattanAPI/Services/Jobs/IJobService.cs`
- `PakWattanAPI/Services/Jobs/JobService.cs`

**Methods Required**:
- `Task<JobOpportunity> CreateAsync(JobOpportunity job, CancellationToken ct = default)`
- `Task<IEnumerable<JobOpportunity>> GetAllAsync(CancellationToken ct = default)`
- `Task<JobOpportunity?> GetByIdAsync(int id, CancellationToken ct = default)`
- `Task<bool> DeleteAsync(int id, CancellationToken ct = default)` (soft delete)

#### **5. Controller**
**File**: `PakWattanAPI/Controllers/JobsController.cs`

**Endpoints**:
- `POST /api/jobs` - Submit job application (Public - AllowAnonymous)
- `GET /api/jobs` - Get all job applications (Admin/Staff only)
- `GET /api/jobs/{id}` - Get job application by ID (Admin/Staff only)
- `DELETE /api/jobs/{id}` - Delete job application (Admin/Staff only)

**Authorization**:
- Public endpoint for submitting applications
- Admin/Staff role required for viewing/managing applications

#### **6. AutoMapper Profile**
**File**: `PakWattanAPI/Mapping/ApiMappingProfile.cs`
- Add mappings for JobOpportunity DTOs

#### **7. Service Registration**
**File**: `PakWattanAPI/Program.cs`
- Register `IJobService` and `JobService` in DI container

#### **8. Database Migration**
- Create migration: `dotnet ef migrations add AddJobOpportunities`
- Apply migration: `dotnet ef database update`

---

### **Frontend (PakWattanModern) - Next.js/React**

#### **1. API Client**
**File**: `lib/api/jobs.ts`

**Interfaces**:
```typescript
export interface JobOpportunity {
  id: number;
  name: string;
  fatherName: string;
  gender?: number; // 0 = Male, 1 = Female, 2 = Other
  mobileNumber: string;
  whatsAppNumber?: string;
  fieldExperiencedInYears?: number;
  subjectTought?: string;
  packageDemand?: string;
  dob?: string;
  creationDate: string;
  modificationDate?: string;
}

export interface JobOpportunityCreateRequest {
  name: string;
  fatherName: string;
  gender?: number;
  mobileNumber: string;
  whatsAppNumber?: string;
  fieldExperiencedInYears?: number;
  subjectTought?: string;
  packageDemand?: string;
  dob?: string;
}
```

**Functions**:
- `submitJobApplication(data: JobOpportunityCreateRequest): Promise<JobOpportunity>`
- `getAllJobApplications(): Promise<JobOpportunity[]>` (Admin/Staff only)
- `getJobApplicationById(id: number): Promise<JobOpportunity>` (Admin/Staff only)
- `deleteJobApplication(id: number): Promise<void>` (Admin/Staff only)

#### **2. Public Job Application Form**
**File**: `app/jobs/page.tsx` or `app/careers/page.tsx`

**Features**:
- Public-facing job application form
- Form fields matching the model
- Gender dropdown (Male, Female, Other)
- Date picker for DOB
- Validation
- Success/error messages
- Similar to registration form pattern

**Form Fields**:
- Name (required)
- Father Name (required)
- Gender (dropdown)
- Mobile Number (required)
- WhatsApp Number (optional)
- Date of Birth (optional)
- Teaching Experience in Years (optional, number)
- Subject Taught (optional, text)
- Package Demand (optional, text)

#### **3. Admin Dashboard - Jobs Management**
**File**: `app/dashboard/jobs/page.tsx`

**Features**:
- Table/list view of all job applications
- Search/filter functionality
- Sort by creation date
- View details modal
- Delete functionality (soft delete)
- Export to Excel (optional, following registrations pattern)
- Print functionality (optional)

**Components Needed**:
- `components/jobs/JobsTable.tsx` - Main table component
- `components/jobs/JobApplicationForm.tsx` - Public form component
- `components/jobs/JobApplicationModal.tsx` - View details modal
- `components/jobs/JobApplicationCard.tsx` - Card view (optional)

#### **4. Navigation Updates**
**Files**:
- `app/dashboard/layout.tsx` - Add "Jobs" to sidebar navigation
- Public navigation - Add "Careers" or "Jobs" link

---

## 🔄 Migration Considerations

### **Data Migration** (if needed)
- If existing data needs to be migrated from legacy system:
  - Export data from old database
  - Transform to new schema
  - Import into new database

### **URL Structure**
- **Legacy**: `/Jobs/SaveAppliedJob`
- **New Frontend**: `/jobs` or `/careers` (public form)
- **New Backend**: `/api/jobs`

---

## 🎨 UI/UX Design Patterns

### **Follow Existing Patterns**
1. **Registration Form** (`app/registration-form/page.tsx`)
   - Similar form structure
   - Validation patterns
   - Success/error handling

2. **Registrations Table** (`components/registrations/RegistrationsTable.tsx`)
   - Table layout
   - Search/filter functionality
   - Export capabilities

3. **Guardian Form** (`components/guardians/GuardianForm.tsx`)
   - Form validation
   - Loading states
   - Error handling

---

## 🔐 Security & Authorization

### **Backend**
- Public endpoint for job submissions (no auth required)
- Admin/Staff role required for:
  - Viewing all applications
  - Viewing individual applications
  - Deleting applications

### **Frontend**
- Public form accessible without login
- Admin dashboard requires authentication
- Role-based access control for jobs management page

---

## 📝 Validation Rules

### **Required Fields**
- Name
- Father Name
- Mobile Number

### **Optional Fields**
- Gender
- WhatsApp Number
- Date of Birth
- Teaching Experience in Years
- Subject Taught
- Package Demand

### **Validation**
- Mobile number format validation
- Email validation (if email field added)
- Date validation for DOB
- Number validation for experience years

---

## 🧪 Testing Checklist

### **Backend**
- [ ] Create job application (POST)
- [ ] Get all job applications (GET) - with auth
- [ ] Get job application by ID (GET) - with auth
- [ ] Delete job application (DELETE) - with auth
- [ ] Validation tests
- [ ] Authorization tests

### **Frontend**
- [ ] Public form submission
- [ ] Form validation
- [ ] Success/error messages
- [ ] Admin jobs list view
- [ ] Search/filter functionality
- [ ] Delete functionality
- [ ] Responsive design

---

## 📦 Files to Create/Modify

### **Backend (PakWattanAPI)**
1. ✅ `Models/JobOpportunity.cs` (NEW)
2. ✅ `DTOs/Jobs/JobDtos.cs` (NEW)
3. ✅ `Services/Jobs/IJobService.cs` (NEW)
4. ✅ `Services/Jobs/JobService.cs` (NEW)
5. ✅ `Controllers/JobsController.cs` (NEW)
6. ✅ `Data/ApplicationDbContext.cs` (MODIFY - add DbSet)
7. ✅ `Mapping/ApiMappingProfile.cs` (MODIFY - add mappings)
8. ✅ `Program.cs` (MODIFY - register service)

### **Frontend (PakWattanModern)**
1. ✅ `lib/api/jobs.ts` (NEW)
2. ✅ `app/jobs/page.tsx` or `app/careers/page.tsx` (NEW)
3. ✅ `app/dashboard/jobs/page.tsx` (NEW)
4. ✅ `components/jobs/JobApplicationForm.tsx` (NEW)
5. ✅ `components/jobs/JobsTable.tsx` (NEW)
6. ✅ `components/jobs/JobApplicationModal.tsx` (NEW)
7. ✅ `app/dashboard/layout.tsx` (MODIFY - add navigation)

---

## 🚀 Implementation Priority

### **Phase 1: Backend Foundation**
1. Create database model
2. Create DTOs
3. Create service interface and implementation
4. Create controller
5. Register services
6. Create and apply migration

### **Phase 2: Frontend Public Form**
1. Create API client
2. Create public job application form
3. Add to public navigation

### **Phase 3: Admin Dashboard**
1. Create admin jobs management page
2. Create table component
3. Add to dashboard navigation
4. Implement search/filter
5. Implement delete functionality

### **Phase 4: Enhancements**
1. Export to Excel
2. Print functionality
3. Email notifications (optional)
4. Advanced filtering

---

## 📚 Related Files Reference

### **Similar Implementations**
- **Registrations**: `RegistrationsController.cs`, `RegistrationService.cs`, `app/registration-form/page.tsx`
- **Admissions**: `AdmissionsController.cs`, `AdmissionService.cs`, `app/admission/page.tsx`
- **Guardians**: `GuardiansController.cs`, `GuardianService.cs`, `components/guardians/`

### **Patterns to Follow**
- Service layer pattern (IRegistrationService, RegistrationService)
- DTO pattern (CreateDto, ResponseDto)
- AutoMapper configuration
- API client pattern (`lib/api/registrations.ts`)
- Form validation pattern
- Table component pattern

---

## ✅ Summary

The JobsController manages job opportunity applications for the school. It allows:
1. **Public submission** of job applications (no authentication required)
2. **Admin/Staff viewing** of all applications (authentication required)
3. **PDF generation** for printing applications list

The implementation should follow the existing patterns in the codebase, particularly:
- Registration/Admission forms for public submission
- Registrations table for admin management
- Service layer architecture
- DTO pattern for API communication

---

**Analysis Date**: 2025-01-30
**Status**: Ready for Implementation

