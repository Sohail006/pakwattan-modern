# 📊 Jobs Excel Import Feature - User Guide

## ✅ Feature Complete!

The Excel import functionality has been successfully implemented for the Jobs module. You can now upload job applications from an Excel file directly to the database.

---

## 🎯 How to Use

### Step 1: Access the Import Feature
1. Navigate to **Dashboard → Jobs** (`/dashboard/jobs`)
2. Click the **"Import Excel"** button (blue button next to Export CSV)

### Step 2: Prepare Your Excel File
Your Excel file should have the following columns in the **first row (header)**:

#### Required Columns:
- **Name** - Full name of the applicant
- **FatherName** or **Father Name** - Father's name
- **MobileNumber** or **Mobile** or **Phone** - Mobile phone number

#### Optional Columns:
- **Gender** - Can be: `Male`, `Female`, `Other`, or `0`, `1`, `2`
- **WhatsAppNumber** or **WhatsApp** - WhatsApp number
- **FieldExperiencedInYears** or **Experience** or **Years** - Number of years (0-50)
- **SubjectTought** or **Subject** - Subject taught
- **PackageDemand** or **Package** or **Salary** - Package/salary demand
- **DOB** or **DateOfBirth** or **BirthDate** - Date of birth

### Step 3: Upload and Import
1. Click **"Upload a file"** or drag and drop your Excel file
2. The system will show a preview of the first 5 rows
3. Review the preview to ensure data is correct
4. Click **"Import Jobs"** to upload
5. Wait for the import to complete
6. Review the results (successful and failed imports)

---

## 📋 Excel File Format Example

| Name | FatherName | MobileNumber | Gender | WhatsAppNumber | FieldExperiencedInYears | SubjectTought | PackageDemand | DOB |
|------|------------|--------------|--------|----------------|------------------------|---------------|---------------|-----|
| John Doe | John Senior | 03001234567 | Male | 03001234567 | 5 | Mathematics | 50000 | 1990-01-15 |
| Jane Smith | James Smith | 03009876543 | Female | 03009876543 | 3 | English | 45000 | 1992-05-20 |

---

## 🔍 Features

### ✅ What Works:
- **Flexible Column Names**: The system recognizes various column name formats (case-insensitive)
- **Data Validation**: Automatically validates required fields
- **Bulk Import**: Import multiple records at once
- **Error Reporting**: Shows detailed errors for failed imports
- **Preview**: See first 5 rows before importing
- **Progress Tracking**: Shows success/failure counts

### 📝 Data Mapping:
- **Gender**: `Male`/`M`/`0` → 0, `Female`/`F`/`1` → 1, `Other`/`O`/`2` → 2
- **Dates**: Supports Excel date format and ISO date strings
- **Numbers**: Automatically parses numeric values

---

## ⚠️ Important Notes

1. **File Format**: Only `.xlsx` and `.xls` files are supported
2. **Required Fields**: Name, FatherName, and MobileNumber are mandatory
3. **Data Validation**: 
   - Mobile numbers must be valid
   - Experience years must be between 0-50
   - Invalid rows will be skipped with error messages
4. **Bulk Operations**: All valid records are saved in a single transaction
5. **Error Handling**: Failed imports are reported with row numbers and error messages

---

## 🛠️ Technical Details

### Backend Endpoints:
- **POST** `/api/jobs/bulk-import` - Bulk import endpoint (Admin/Staff only)

### Frontend Components:
- `components/jobs/JobsExcelImport.tsx` - Import modal component
- `components/jobs/JobsTable.tsx` - Updated with import button
- `lib/api/jobs.ts` - Added `bulkImportJobApplications()` function

### Backend Services:
- `Services/Jobs/JobService.cs` - Added `BulkImportAsync()` method
- `Controllers/JobsController.cs` - Added bulk import endpoint
- `DTOs/Jobs/JobDtos.cs` - Added `BulkImportResponseDto`

---

## 📊 Import Results

After importing, you'll see:
- **Success Count**: Number of records successfully imported
- **Failed Count**: Number of records that failed
- **Error List**: Detailed error messages for each failed row

---

## 🎉 Ready to Use!

The feature is now fully functional. Simply:
1. Prepare your Excel file with the required columns
2. Click "Import Excel" in the Jobs dashboard
3. Upload your file and review the preview
4. Click "Import Jobs" to complete the import

---

*Feature implemented on December 13, 2024*
