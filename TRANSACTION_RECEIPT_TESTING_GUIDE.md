# 📸 Transaction Receipt Upload - Testing Guide

**Date:** Testing Date  
**Status:** 🧪 Testing Guide

---

## 🎯 Testing Overview

This guide provides comprehensive testing procedures for the transaction receipt upload feature, covering both frontend and backend components.

---

## ✅ Frontend Testing

### 1. **ReceiptUpload Component Testing**

#### Test 1.1: Component Rendering
- [ ] Component renders correctly
- [ ] Drag & drop zone displays
- [ ] Instructions panel is visible (collapsed by default)
- [ ] Camera icon displays correctly
- [ ] File size limit message shows (5MB)

#### Test 1.2: File Upload - Valid Images
- [ ] Upload JPG image (< 5MB) → Success
- [ ] Upload JPEG image (< 5MB) → Success
- [ ] Upload PNG image (< 5MB) → Success
- [ ] Preview displays after upload
- [ ] Success checkmark appears
- [ ] Remove button works

#### Test 1.3: File Upload - Invalid Files
- [ ] Upload PDF file → Error: "PDF files are not supported"
- [ ] Upload file > 5MB → Error: "File size exceeds maximum"
- [ ] Upload invalid file type → Error: "Invalid file type"
- [ ] Error messages are user-friendly
- [ ] "Try again" button works

#### Test 1.4: Drag & Drop
- [ ] Drag image over zone → Visual feedback (border color change)
- [ ] Drop image → Upload starts
- [ ] Drag non-image file → Error message
- [ ] Drag multiple files → Only first file uploaded

#### Test 1.5: Instructions Panel
- [ ] Click to expand instructions → Panel expands
- [ ] Good vs Bad examples display correctly
- [ ] Step-by-step guide shows
- [ ] Click to collapse → Panel collapses

#### Test 1.6: Mobile Testing
- [ ] Component displays correctly on mobile
- [ ] Touch interactions work
- [ ] File picker opens on mobile
- [ ] Preview displays correctly on mobile

---

### 2. **Registration Form Integration Testing**

#### Test 2.1: Conditional Display
- [ ] Select "EasyPaisa" → Receipt upload field appears
- [ ] Select "Bank Account" → Receipt upload field appears
- [ ] Select "By Hand on Test Date" → Receipt upload field hidden
- [ ] Smooth animation when field appears/disappears

#### Test 2.2: Validation
- [ ] Select EasyPaisa → Try to submit without receipt → Error: "Transaction receipt is required"
- [ ] Select Bank Account → Try to submit without receipt → Error: "Transaction receipt is required"
- [ ] Upload receipt → Error clears
- [ ] Select "By Hand on Test Date" → Submit without receipt → Success (not required)

#### Test 2.3: Form Submission
- [ ] Upload receipt → Fill all fields → Submit → Success
- [ ] Receipt URL included in submission
- [ ] Form data includes `transactionReceiptUrl`
- [ ] Success message displays

#### Test 2.4: Error Handling
- [ ] Upload fails → Error message displays
- [ ] Network error → Friendly error message
- [ ] Form validation errors clear when receipt uploaded

---

### 3. **Registrations Table Testing**

#### Test 3.1: Receipt Column Display
- [ ] Receipt column appears in table
- [ ] Column header is sortable
- [ ] Status badges display correctly:
  - [ ] Verified → Green badge with checkmark
  - [ ] Rejected → Red badge with X
  - [ ] Pending → Yellow badge with clock
  - [ ] Missing → Red badge with alert
  - [ ] N/A → Gray badge (for "By Hand on Test Date")

#### Test 3.2: Receipt Status Sorting
- [ ] Click receipt column header → Sorts by status
- [ ] Click again → Reverses sort order
- [ ] Sorting works correctly for all statuses

#### Test 3.3: Receipt View Modal
- [ ] Click receipt badge → Modal opens
- [ ] Receipt image displays correctly
- [ ] Image URL constructs correctly (absolute URL)
- [ ] Verification status displays
- [ ] Verification history shows (if verified)
- [ ] Close button works

#### Test 3.4: Receipt Verification Actions
- [ ] Click "Mark as Verified" → Verification dialog opens
- [ ] Enter notes → Click Confirm → Status updates to "Verified"
- [ ] Click "Reject" → Verification dialog opens
- [ ] Enter rejection reason → Click Confirm → Status updates to "Rejected"
- [ ] Cancel button works
- [ ] Table refreshes after verification

#### Test 3.5: Download Receipt
- [ ] Click "Download" button → Receipt downloads
- [ ] Downloaded file is correct image
- [ ] File name is appropriate

---

## 🔧 Backend Testing

### 4. **Database Schema Testing**

#### Test 4.1: Column Existence
```sql
-- Run this query to verify columns exist
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    CHARACTER_MAXIMUM_LENGTH
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'Registrations'
    AND COLUMN_NAME IN (
        'TransactionReceiptUrl',
        'ReceiptVerificationStatus',
        'ReceiptVerifiedBy',
        'ReceiptVerifiedAt',
        'ReceiptVerificationNotes'
    )
ORDER BY COLUMN_NAME
```
- [ ] All 5 columns exist
- [ ] Data types are correct
- [ ] Nullable settings are correct

#### Test 4.2: Constraints
- [ ] Check constraint on ReceiptVerificationStatus works
- [ ] Foreign key to AspNetUsers works (if implemented)
- [ ] Index on ReceiptVerificationStatus exists

---

### 5. **Upload Receipt API Testing**

#### Test 5.1: Valid Upload
```http
POST /api/registrations/upload-receipt
Content-Type: multipart/form-data

file: [valid image file < 5MB]
```
- [ ] Returns 200 OK
- [ ] Returns `{ receiptUrl: "/uploads/registrations/receipts/{uuid}.jpg" }`
- [ ] File saved to correct location
- [ ] File name is unique (GUID)

#### Test 5.2: Invalid File Types
```http
POST /api/registrations/upload-receipt
Content-Type: multipart/form-data

file: [PDF file]
```
- [ ] Returns 400 Bad Request
- [ ] Error message: "PDF files are not supported"

```http
file: [invalid file type]
```
- [ ] Returns 400 Bad Request
- [ ] Error message: "Invalid file type"

#### Test 5.3: File Size Validation
```http
file: [image file > 5MB]
```
- [ ] Returns 400 Bad Request
- [ ] Error message: "File size exceeds maximum allowed size"

#### Test 5.4: Missing File
```http
POST /api/registrations/upload-receipt
Content-Type: multipart/form-data

(no file)
```
- [ ] Returns 400 Bad Request
- [ ] Error message: "No file provided"

---

### 6. **Verify Receipt API Testing**

#### Test 6.1: Verify Receipt (Success)
```http
POST /api/registrations/1/verify-receipt
Content-Type: application/json
Authorization: Bearer {admin_token}

{
  "verificationStatus": "Verified",
  "verificationNotes": "Receipt verified successfully"
}
```
- [ ] Returns 200 OK
- [ ] Returns updated RegistrationResponse
- [ ] ReceiptVerificationStatus = "Verified"
- [ ] ReceiptVerifiedBy = current user ID
- [ ] ReceiptVerifiedAt = current timestamp
- [ ] ReceiptVerificationNotes = provided notes

#### Test 6.2: Reject Receipt
```http
POST /api/registrations/1/verify-receipt
Content-Type: application/json
Authorization: Bearer {admin_token}

{
  "verificationStatus": "Rejected",
  "verificationNotes": "Receipt is unclear"
}
```
- [ ] Returns 200 OK
- [ ] ReceiptVerificationStatus = "Rejected"
- [ ] Notes saved correctly

#### Test 6.3: Invalid Status
```http
{
  "verificationStatus": "InvalidStatus"
}
```
- [ ] Returns 400 Bad Request
- [ ] Error message: "Invalid verification status"

#### Test 6.4: Unauthorized Access
```http
POST /api/registrations/1/verify-receipt
(no authorization header)
```
- [ ] Returns 401 Unauthorized

#### Test 6.5: Registration Not Found
```http
POST /api/registrations/99999/verify-receipt
```
- [ ] Returns 404 Not Found

#### Test 6.6: No Receipt Uploaded
```http
POST /api/registrations/{id}/verify-receipt
(registration without receipt)
```
- [ ] Returns 400 Bad Request
- [ ] Error message: "No receipt uploaded"

---

### 7. **Registration Create/Update Testing**

#### Test 7.1: Create Registration with Receipt
```http
POST /api/registrations
Content-Type: application/json

{
  ...registration data,
  "transactionReceiptUrl": "/uploads/registrations/receipts/{uuid}.jpg"
}
```
- [ ] Registration created successfully
- [ ] ReceiptVerificationStatus = "Pending" (default)
- [ ] TransactionReceiptUrl saved correctly

#### Test 7.2: Create Registration without Receipt
```http
{
  ...registration data,
  "transactionReceiptUrl": null
}
```
- [ ] Registration created successfully
- [ ] ReceiptVerificationStatus = null

#### Test 7.3: Update Registration Receipt
```http
PUT /api/registrations/1
Content-Type: application/json

{
  "transactionReceiptUrl": "/uploads/registrations/receipts/new-receipt.jpg"
}
```
- [ ] Receipt URL updated
- [ ] If new receipt, ReceiptVerificationStatus reset to "Pending"

---

## 🔄 Integration Testing

### 8. **End-to-End Testing**

#### Test 8.1: Complete Registration Flow
1. [ ] User fills registration form
2. [ ] Selects "EasyPaisa" payment method
3. [ ] Receipt upload field appears
4. [ ] User uploads receipt photo
5. [ ] Preview displays
6. [ ] User submits form
7. [ ] Registration created with receipt URL
8. [ ] Receipt status is "Pending" in database

#### Test 8.2: Admin Verification Flow
1. [ ] Admin views registrations table
2. [ ] Sees receipt status badge (Pending)
3. [ ] Clicks receipt badge
4. [ ] Receipt modal opens with image
5. [ ] Admin clicks "Mark as Verified"
6. [ ] Verification dialog opens
7. [ ] Admin enters notes and confirms
8. [ ] Status updates to "Verified"
9. [ ] Table refreshes with new status
10. [ ] Verification history displays

#### Test 8.3: Receipt Rejection Flow
1. [ ] Admin views receipt
2. [ ] Clicks "Reject"
3. [ ] Enters rejection reason
4. [ ] Confirms rejection
5. [ ] Status updates to "Rejected"
6. [ ] Rejection reason saved

---

## 🐛 Error Scenarios Testing

### 9. **Error Handling**

#### Test 9.1: Network Errors
- [ ] Upload fails due to network → Error message displays
- [ ] Verification fails due to network → Error message displays
- [ ] User can retry after error

#### Test 9.2: Server Errors
- [ ] Backend returns 500 → Friendly error message
- [ ] Backend returns 503 → Friendly error message
- [ ] Error messages are user-friendly

#### Test 9.3: File System Errors
- [ ] Upload directory doesn't exist → Server creates it
- [ ] Disk full → Appropriate error message
- [ ] Permission denied → Appropriate error message

---

## 📱 Cross-Browser & Device Testing

### 10. **Browser Compatibility**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (Chrome, Safari)

### 11. **Device Testing**
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Touch interactions work
- [ ] Responsive design works

---

## ✅ Test Checklist Summary

### Frontend Tests: 50+ test cases
- [ ] ReceiptUpload Component (15 tests)
- [ ] Registration Form Integration (10 tests)
- [ ] Registrations Table (15 tests)
- [ ] Error Handling (5 tests)
- [ ] Cross-Browser (5 tests)

### Backend Tests: 20+ test cases
- [ ] Database Schema (5 tests)
- [ ] Upload API (5 tests)
- [ ] Verify API (6 tests)
- [ ] Registration Create/Update (3 tests)
- [ ] Error Handling (3 tests)

### Integration Tests: 3 end-to-end flows
- [ ] Complete Registration Flow
- [ ] Admin Verification Flow
- [ ] Receipt Rejection Flow

---

## 📊 Test Results Template

```
Test Date: __________
Tester: __________
Environment: [ ] Development [ ] Staging [ ] Production

Frontend Tests:
- ReceiptUpload Component: [ ] Pass [ ] Fail
- Registration Form: [ ] Pass [ ] Fail
- Registrations Table: [ ] Pass [ ] Fail

Backend Tests:
- Database Schema: [ ] Pass [ ] Fail
- Upload API: [ ] Pass [ ] Fail
- Verify API: [ ] Pass [ ] Fail

Integration Tests:
- Registration Flow: [ ] Pass [ ] Fail
- Verification Flow: [ ] Pass [ ] Fail

Issues Found:
1. __________
2. __________
3. __________

Overall Status: [ ] Ready for Production [ ] Needs Fixes
```

---

## 🚀 Quick Test Commands

### Frontend (Browser Console)
```javascript
// Test ReceiptUpload component
// Open registration form and test upload

// Test API calls
fetch('/api/registrations/upload-receipt', {
  method: 'POST',
  body: formData
})
```

### Backend (Postman/HTTP Client)
```http
# Upload Receipt
POST http://localhost:7210/api/registrations/upload-receipt
Content-Type: multipart/form-data

# Verify Receipt
POST http://localhost:7210/api/registrations/1/verify-receipt
Content-Type: application/json
Authorization: Bearer {token}

{
  "verificationStatus": "Verified",
  "verificationNotes": "Test verification"
}
```

---

**Testing Guide Complete** - Use this guide to systematically test all features! 🧪
