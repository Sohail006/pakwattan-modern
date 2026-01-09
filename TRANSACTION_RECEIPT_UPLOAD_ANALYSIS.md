# 📄 Transaction Receipt Upload - Analysis & Requirements

**Date:** Analysis Date  
**Status:** 📋 Analysis Complete  
**Components:** 
- Registration Form (`components/registration-form/StudentRegistrationForm.tsx`)
- Registrations Table (`components/registrations/RegistrationsTable.tsx`)

---

## 🎯 Requirements Summary

### **User Story:**
As a student/parent registering for admission, I want to upload a **photo of my transaction receipt** when I pay via Bank Account or EasyPaisa, so that the administration can verify my payment. The upload process should be easy, with clear instructions and an attractive interface.

As an admin/administration staff, I want to see and verify transaction receipt photos in the registrations table, so that I can confirm payments have been made. The verification process should be intuitive and efficient.

---

## 📋 Functional Requirements

### **1. Registration Form Requirements:**

#### **1.1 Conditional Mandatory Field:**
- ✅ **Transaction Receipt Upload** field should be:
  - **Mandatory** when payment method is:
    - `EasyPaisa` (value: 0)
    - `Bank Account` (value: 1)
  - **Optional/Hidden** when payment method is:
    - `By Hand on Test Date` (value: 2)

#### **1.2 File Upload Requirements:**
- **File Types:** **JPG, JPEG, PNG ONLY** (photos of transaction receipts)
  - ❌ **NO PDF support** - Users must take/upload photos
  - ✅ Images only for better mobile compatibility and easier viewing
- **File Size:** Maximum 5MB
- **Upload Location:** After payment method selection, with prominent placement
- **Validation:** 
  - File type validation (images only, strict - reject PDFs)
  - File size validation with helpful error messages
  - Required validation (only for EasyPaisa/Bank Account)
  - Image quality check (optional - warn if image is too blurry)
- **Image Processing:** 
  - Automatic compression for large images
  - Maintains readability of receipt details
  - Optimizes for web display while preserving quality

#### **1.3 User Experience - Advanced & Attractive UI/UX:**
- **Conditional Display:** Show upload field only when EasyPaisa or Bank Account is selected
- **Clear Instructions:** 
  - Step-by-step guide on how to take/upload receipt photo
  - Visual examples/illustrations
  - Tips for taking clear photos
  - What information should be visible in the receipt
- **User-Friendly Features:**
  - Drag & drop zone with visual feedback
  - Click to browse button
  - Real-time image preview with zoom
  - Image rotation/crop tools (if needed)
  - Upload progress indicator with animation
  - Success confirmation with checkmark
  - Clear error messages with solutions
  - Remove/re-upload functionality
- **Attractive Design:**
  - Modern gradient backgrounds
  - Smooth animations and transitions
  - Icon-based visual cues
  - Color-coded status indicators
  - Responsive design for mobile/tablet/desktop
  - Accessible design (keyboard navigation, screen readers)

---

### **2. Registrations Table Requirements:**

#### **2.1 Display Receipt in Table:**
- Add "Receipt" column (or icon/button) in registrations table
- Show receipt status:
  - ✅ **Uploaded** - Green badge/icon (receipt available)
  - ❌ **Missing** - Red badge/icon (receipt not uploaded)
  - ⚪ **N/A** - Gray badge/icon (not required - "By Hand on Test Date")

#### **2.2 Receipt Verification:**
- **View Receipt:** Click to view/download receipt
- **Verification Status:** Admin can mark receipt as:
  - ✅ **Verified** - Receipt is valid
  - ❌ **Rejected** - Receipt is invalid/missing information
  - ⏳ **Pending** - Not yet verified
- **Verification Actions:**
  - View receipt in modal/lightbox
  - Download receipt
  - Mark as verified/rejected
  - Add verification notes/comments

#### **2.3 Table Column Features:**
- **Sortable:** Sort by receipt status (Uploaded/Missing/N/A)
- **Filterable:** Filter by receipt status
- **Visual Indicators:** Color-coded badges/icons for quick identification

---

## 🔍 Current State Analysis

### **Registration Form Structure:**

**File:** `components/registration-form/StudentRegistrationForm.tsx`

**Current Payment Method Section (Lines 1223-1410):**
```tsx
<FormField label="Registration Fee Payment Method" required>
  <select
    id="paymentMethod"
    name="paymentMethod"
    value={formData.paymentMethod}
    onChange={handleInputChange}
  >
    <option value={0}>EasyPaisa</option>
    <option value={1}>Bank Account</option>
    <option value={2}>By Hand on Test Date</option>
  </select>
  
  {/* Payment method specific information displayed */}
</FormField>
```

**Current FormData Interface (Lines 101-116):**
```typescript
interface FormData {
  name: string
  fatherName: string
  dob: string
  gender: number
  gradeId: number
  mobile: string
  whatsApp: string
  email: string
  formBorCNIC: string
  previousSchoolName: string
  profilePictureUrl: string | null
  applyForScholarship: boolean
  scholarshipType: number | null
  paymentMethod: number
  // ❌ NO transactionReceiptUrl field
}
```

**Current RegistrationRequest Interface:**
```typescript
export interface RegistrationRequest {
  // ... existing fields
  paymentMethod: number
  // ❌ NO transactionReceiptUrl field
}
```

**Current RegistrationResponse Interface:**
```typescript
export interface RegistrationResponse {
  // ... existing fields
  paymentMethod: string
  paymentStatus?: string
  // ❌ NO transactionReceiptUrl field
  // ❌ NO receiptVerificationStatus field
}
```

---

### **Existing File Upload Pattern:**

**ProfileImageUpload Component:**
- Location: `components/ui/ProfileImageUpload.tsx`
- Features:
  - Drag & drop support
  - Image compression
  - Preview functionality
  - Error handling
  - Upload progress
  - File validation (type, size)

**Upload API Pattern:**
- Uses `api.postFormData()` for file uploads
- Uploads to temporary location first
- Returns URL string
- Example: `uploadStudentProfileImageTemp(file: File): Promise<string>`

---

### **Registrations Table Structure:**

**Current Columns:**
1. Roll Number
2. Name
3. Father Name
4. Grade
5. Mobile
6. Scholarship
7. Payment Status
8. Test Date
9. Test Venue
10. Reg. Date
11. Actions

**Missing:**
- ❌ Receipt column
- ❌ Receipt verification status
- ❌ Receipt view/download functionality

---

## 💡 Implementation Approach

### **Option 1: Reuse ProfileImageUpload Component** (Recommended)

**Pros:**
- ✅ Already handles file upload, validation, compression
- ✅ Has preview functionality
- ✅ Well-tested and stable
- ✅ Supports drag & drop

**Cons:**
- ⚠️ Designed for images (circular/square preview)
- ⚠️ Designed for profile pictures (circular/square preview)
- ⚠️ Lacks receipt-specific instructions
- ⚠️ Not optimized for receipt upload UX

**Not Recommended:** Create dedicated component for better UX

---

### **Option 2: Reuse ProfileImageUpload Component** (Not Recommended)

**Pros:**
- ✅ Already handles file upload, validation, compression
- ✅ Has preview functionality
- ✅ Well-tested and stable

**Cons:**
- ⚠️ Designed for profile pictures (circular/square preview)
- ⚠️ Lacks receipt-specific instructions
- ⚠️ Not optimized for receipt upload UX
- ⚠️ Would need significant modifications

**Recommendation:** Not recommended - Create dedicated component for better UX

---

## 📝 Detailed Implementation Plan

### **Phase 1: Backend Requirements**

#### **1.1 Database Schema Changes:**

**Registration Entity:**
```sql
ALTER TABLE Registrations ADD COLUMN TransactionReceiptUrl NVARCHAR(MAX) NULL;
ALTER TABLE Registrations ADD COLUMN ReceiptVerificationStatus NVARCHAR(50) NULL; -- 'Pending', 'Verified', 'Rejected'
ALTER TABLE Registrations ADD COLUMN ReceiptVerifiedBy NVARCHAR(100) NULL;
ALTER TABLE Registrations ADD COLUMN ReceiptVerifiedAt DATETIME NULL;
ALTER TABLE Registrations ADD COLUMN ReceiptVerificationNotes NVARCHAR(500) NULL;
```

#### **1.2 API Endpoints Required:**

**Upload Receipt:**
```
POST /api/registrations/upload-receipt
Content-Type: multipart/form-data
Body: { file: File }
Response: { receiptUrl: string }
```

**Update Registration with Receipt:**
```
PUT /api/registrations/{id}
Body: { transactionReceiptUrl: string }
Response: RegistrationResponse
```

**Verify Receipt:**
```
POST /api/registrations/{id}/verify-receipt
Body: { 
  verificationStatus: 'Verified' | 'Rejected',
  verificationNotes?: string
}
Response: RegistrationResponse
```

**Get Receipt:**
```
GET /api/registrations/{id}/receipt
Response: Image file (JPG/JPEG/PNG)
- Serves receipt image for viewing/downloading
- No PDF support - images only
```

---

### **Phase 2: Frontend - Registration Form**

#### **2.1 Update FormData Interface:**

```typescript
interface FormData {
  // ... existing fields
  paymentMethod: number
  transactionReceiptUrl: string | null  // ✅ NEW
}
```

#### **2.2 Add Receipt Upload Field:**

**Location:** After payment method selection, before form submission

**Conditional Display with Advanced UI:**
```tsx
{(formData.paymentMethod === 0 || formData.paymentMethod === 1) && (
  <FormField 
    label="Transaction Receipt Photo" 
    required={formData.paymentMethod === 0 || formData.paymentMethod === 1}
    htmlFor="transactionReceipt"
  >
    <ReceiptUpload
      value={formData.transactionReceiptUrl}
      onChange={(url) => handleInputChange('transactionReceiptUrl', url)}
      accept="image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png"
      maxSize={5 * 1024 * 1024} // 5MB
      showInstructions={true}
    />
    
    {/* Additional Help Text */}
    <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-900 mb-1">
            📸 How to Upload Your Receipt Photo
          </p>
          <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
            <li>Take a clear, well-lit photo of your transaction receipt</li>
            <li>Ensure all details are visible: amount, date, transaction ID</li>
            <li>Make sure the photo is not blurry or too dark</li>
            <li>Accepted formats: JPG, JPEG, PNG (Max 5MB)</li>
          </ul>
        </div>
      </div>
    </div>
  </FormField>
)}
```

#### **2.3 Update Validation:**

```typescript
// In handleSubmit function
if ((formData.paymentMethod === 0 || formData.paymentMethod === 1) && !formData.transactionReceiptUrl) {
  setFieldErrors(prev => ({
    ...prev,
    transactionReceiptUrl: 'Transaction receipt is required for EasyPaisa and Bank Account payments'
  }))
  return
}
```

#### **2.4 Update RegistrationRequest:**

```typescript
export interface RegistrationRequest {
  // ... existing fields
  paymentMethod: number
  transactionReceiptUrl?: string  // ✅ NEW
}
```

#### **2.5 Update submitRegistration Call:**

```typescript
const response = await submitRegistration({
  // ... existing fields
  paymentMethod: formData.paymentMethod,
  transactionReceiptUrl: formData.transactionReceiptUrl || undefined,  // ✅ NEW
})
```

---

### **Phase 3: Frontend - Registrations Table**

#### **3.1 Update RegistrationResponse Interface:**

```typescript
export interface RegistrationResponse {
  // ... existing fields
  transactionReceiptUrl?: string  // ✅ NEW
  receiptVerificationStatus?: string  // ✅ NEW - 'Pending' | 'Verified' | 'Rejected'
  receiptVerifiedBy?: string  // ✅ NEW
  receiptVerifiedAt?: string  // ✅ NEW
  receiptVerificationNotes?: string  // ✅ NEW
}
```

#### **3.2 Add Receipt Column:**

**Location:** After "Payment Status" column, before "Test Date"

**Column Header:**
```tsx
<th className="...">
  <div className="flex items-center gap-2">
    <span>Receipt</span>
    {/* Sort icon */}
  </div>
</th>
```

**Column Cell - Attractive Design:**
```tsx
<td className="px-4 sm:px-5 py-4 overflow-hidden hidden lg:table-cell">
  <div className="min-w-0">
    {getReceiptStatusBadge(reg.transactionReceiptUrl, reg.paymentMethod, reg.receiptVerificationStatus)}
  </div>
</td>
```

**Receipt Status Badge - Advanced UI:**
- **Uploaded (Pending Verification):**
  - Icon: FileText with yellow background
  - Badge: "View Receipt" button
  - Hover effect: Scale and shadow
  - Click: Opens receipt view modal

- **Verified:**
  - Icon: CheckCircle with green background
  - Badge: "Verified" with green gradient
  - Tooltip: "Verified by [Admin] on [Date]"

- **Rejected:**
  - Icon: XCircle with red background
  - Badge: "Rejected" with red gradient
  - Tooltip: Shows rejection reason

- **Missing:**
  - Icon: AlertCircle with orange background
  - Badge: "Missing" with warning style
  - Action: Can upload receipt (if admin)

- **N/A (Not Required):**
  - Icon: Minus with gray background
  - Badge: "N/A" with gray style
  - Tooltip: "Not required for this payment method"

#### **3.3 Receipt Status Badge Function:**

```typescript
const getReceiptStatusBadge = (
  receiptUrl?: string, 
  paymentMethod?: string,
  verificationStatus?: string
) => {
  // If payment method is "By Hand on Test Date", show N/A
  if (paymentMethod === 'By Hand on Test Date' || paymentMethod === 'ByHandOnTestDate') {
    return (
      <span className="...">N/A</span>
    )
  }
  
  // If receipt is uploaded
  if (receiptUrl) {
    // Check verification status
    if (verificationStatus === 'Verified') {
      return (
        <div className="flex items-center gap-2">
          <button onClick={() => viewReceipt(receiptUrl)}>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </button>
          <span className="text-xs text-green-600">Verified</span>
        </div>
      )
    }
    if (verificationStatus === 'Rejected') {
      return (
        <div className="flex items-center gap-2">
          <button onClick={() => viewReceipt(receiptUrl)}>
            <AlertCircle className="w-5 h-5 text-red-600" />
          </button>
          <span className="text-xs text-red-600">Rejected</span>
        </div>
      )
    }
    // Pending verification
    return (
      <div className="flex items-center gap-2">
        <button onClick={() => viewReceipt(receiptUrl)}>
          <FileText className="w-5 h-5 text-yellow-600" />
        </button>
        <span className="text-xs text-yellow-600">Pending</span>
      </div>
    )
  }
  
  // Receipt missing
  return (
    <span className="...">Missing</span>
  )
}
```

#### **3.4 Receipt View Modal:**

```tsx
{viewingReceipt && (
  <Modal>
    <div>
      <h3>Transaction Receipt</h3>
      {receiptType === 'pdf' ? (
        <iframe src={receiptUrl} />
      ) : (
        <img src={receiptUrl} alt="Receipt" />
      )}
      <div>
        <button onClick={verifyReceipt}>Mark as Verified</button>
        <button onClick={rejectReceipt}>Reject</button>
        <button onClick={downloadReceipt}>Download</button>
      </div>
    </div>
  </Modal>
)}
```

#### **3.5 Receipt Verification Actions:**

```typescript
const verifyReceipt = async (registrationId: number) => {
  await api.post(`/api/registrations/${registrationId}/verify-receipt`, {
    verificationStatus: 'Verified',
    verificationNotes: 'Receipt verified successfully'
  })
  // Refresh registrations
}

const rejectReceipt = async (registrationId: number, notes: string) => {
  await api.post(`/api/registrations/${registrationId}/verify-receipt`, {
    verificationStatus: 'Rejected',
    verificationNotes: notes
  })
  // Refresh registrations
}
```

---

## 🎨 UI/UX Design

### **Registration Form:**

**Receipt Upload Component:**
- **Layout:** Full-width field below payment method
- **Upload Area:** 
  - Drag & drop zone
  - Click to browse button
  - File preview (PDF icon or image thumbnail)
  - Remove button
- **Visual Feedback:**
  - Upload progress indicator
  - Success checkmark
  - Error messages
- **Instructions:**
  - Clear text about what to upload
  - Accepted file formats
  - Maximum file size

**Conditional Display:**
- Show only when EasyPaisa (0) or Bank Account (1) selected
- Hide when "By Hand on Test Date" (2) selected
- Smooth transition animation

---

### **Registrations Table:**

**Receipt Column:**
- **Icon/Button:** Clickable to view receipt
- **Status Badge:**
  - ✅ **Verified** - Green with checkmark
  - ❌ **Rejected** - Red with X
  - ⏳ **Pending** - Yellow with clock
  - 📄 **Uploaded** - Blue with file icon
  - ❌ **Missing** - Red with warning
  - ⚪ **N/A** - Gray (not required)

**Receipt View Modal - Advanced Design:**
- **Header:** 
  - Student name, registration ID
  - Payment method badge
  - Receipt upload date
- **Content:** 
  - Large image viewer (no PDF support needed)
  - Zoom in/out controls
  - Pan functionality for zoomed images
  - Fullscreen mode
  - Image rotation controls (if needed)
  - Download button with icon
- **Actions:**
  - "Mark as Verified" button (green gradient with checkmark icon)
  - "Reject" button (red gradient with X icon) with notes field
  - "Close" button (X icon in header)
- **Verification Info Panel:**
  - Verified by: [Admin name] with avatar
  - Verified at: [Date/Time] with calendar icon
  - Notes: [Verification notes] in expandable section
  - Status badge with color coding
- **Design Features:**
  - Smooth modal animations
  - Backdrop blur effect
  - Responsive layout
  - Touch gestures for mobile (pinch to zoom, swipe to close)

---

## 🔧 Technical Implementation Details

### **1. ReceiptUpload Component:**

**File:** `components/ui/ReceiptUpload.tsx` (new file)

**Props:**
```typescript
interface ReceiptUploadProps {
  value?: string | null
  onChange: (receiptUrl: string | null) => void
  onError?: (error: string) => void
  disabled?: boolean
  required?: boolean
  accept?: string  // Default: 'image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png'
  maxSize?: number  // Default: 5MB
  showInstructions?: boolean  // Default: true
}
```

**Features - Advanced & User-Friendly:**
- **File Type Validation:** Images only (JPG, JPEG, PNG) - no PDF
- **File Size Validation:** Max 5MB with helpful error messages
- **Image Compression:** Automatic compression for large images while maintaining quality
- **Image Preview:** 
  - Large thumbnail preview
  - Zoom functionality on click/hover
  - Image quality indicator
  - Receipt details visibility check
- **Drag & Drop Support:**
  - Visual feedback on drag over
  - Animated border and background
  - Clear drop zone indicators
- **Upload Progress:**
  - Animated progress bar
  - Percentage display
  - Upload speed indicator
- **Error Handling:**
  - Friendly, actionable error messages
  - Visual error indicators
  - Retry functionality
- **Remove/Replace:**
  - Easy remove button
  - Confirmation dialog
  - Smooth transitions
- **Instructions Panel:**
  - Collapsible/expandable instructions
  - Visual examples
  - Step-by-step guide
  - Tips and best practices
- **Mobile Features:**
  - Direct camera access button
  - Touch-optimized interface
  - Responsive design
- **Accessibility:**
  - Keyboard navigation
  - Screen reader support
  - ARIA labels
  - Focus indicators

---

### **2. API Functions:**

**File:** `lib/api/registrations.ts`

**New Functions:**
```typescript
// Upload receipt image (images only, no PDF)
export async function uploadReceipt(file: File): Promise<string>
// - Validates: Image type only (JPG, JPEG, PNG)
// - Compresses large images automatically
// - Returns: Image URL string

// Verify receipt
export async function verifyReceipt(
  registrationId: number, 
  status: 'Verified' | 'Rejected',
  notes?: string
): Promise<RegistrationResponse>

// Get receipt image URL (for display)
export function getReceiptUrl(receiptUrl: string): string
```

---

### **3. Backend API Endpoints:**

**Upload Receipt:**
```
POST /api/registrations/upload-receipt
- Accepts: multipart/form-data
- File Types: Images ONLY (JPG, JPEG, PNG) - Rejects PDFs
- Validates: 
  - File type (strict - only images)
  - File size (max 5MB)
  - Image format validation
- Returns: { receiptUrl: string }
- Stores file in: /uploads/registrations/receipts/
- Auto-compresses large images while maintaining quality
- Optimizes image for web display
```

**Verify Receipt:**
```
POST /api/registrations/{id}/verify-receipt
- Body: { verificationStatus, verificationNotes }
- Updates: ReceiptVerificationStatus, ReceiptVerifiedBy, ReceiptVerifiedAt, ReceiptVerificationNotes
- Returns: Updated RegistrationResponse
```

---

## 📊 Data Flow

### **Registration Flow:**

1. **User selects payment method:**
   - EasyPaisa (0) or Bank Account (1) → Show receipt upload field
   - By Hand on Test Date (2) → Hide receipt upload field

2. **User uploads receipt:**
   - File selected → Validate → Compress (if image) → Upload to server
   - Server returns `receiptUrl`
   - Store in `formData.transactionReceiptUrl`

3. **Form submission:**
   - Validate receipt is present (if required)
   - Include `transactionReceiptUrl` in `RegistrationRequest`
   - Backend saves receipt URL to database

4. **Backend processing:**
   - Store receipt file
   - Save receipt URL to registration
   - Set `receiptVerificationStatus = 'Pending'`

---

### **Verification Flow:**

1. **Admin views registrations table:**
   - Sees receipt status badge
   - Clicks to view receipt

2. **Admin views receipt:**
   - Opens modal with receipt (PDF/image)
   - Reviews receipt details

3. **Admin verifies receipt:**
   - Clicks "Mark as Verified" or "Reject"
   - If reject, adds notes
   - Backend updates verification status
   - Table refreshes with new status

---

## 🧪 Test Scenarios

### **Registration Form:**

1. **Test Case 1: EasyPaisa Payment**
   - Select EasyPaisa → Receipt field appears
   - Try to submit without receipt → Validation error
   - Upload receipt → Submit → Success

2. **Test Case 2: Bank Account Payment**
   - Select Bank Account → Receipt field appears
   - Upload receipt photo (JPG/PNG) → Submit → Success

3. **Test Case 3: By Hand on Test Date**
   - Select "By Hand on Test Date" → Receipt field hidden
   - Submit without receipt → Success (not required)

4. **Test Case 4: File Validation**
   - Try to upload PDF file → Error (images only)
   - Try to upload invalid image type → Error
   - Try to upload file > 5MB → Error with helpful message
   - Upload valid image file → Success with preview
   - Upload blurry image → Warning (if quality check implemented)

5. **Test Case 5: User Instructions**
   - Instructions panel displays correctly
   - Visual examples show properly
   - Tips are helpful and clear
   - Mobile camera access works (if available)

---

### **Registrations Table:**

1. **Test Case 1: View Receipt**
   - Click receipt icon → Modal opens
   - Receipt image displays correctly
   - Zoom controls work properly
   - Image quality is clear

2. **Test Case 2: Verify Receipt**
   - Click "Mark as Verified" → Status updates
   - Badge changes to green "Verified"

3. **Test Case 3: Reject Receipt**
   - Click "Reject" → Add notes → Submit
   - Status updates to "Rejected"
   - Badge changes to red "Rejected"

4. **Test Case 4: Filter/Sort**
   - Filter by "Missing Receipts" → Shows only missing
   - Sort by receipt status → Sorts correctly

---

## 📋 Implementation Checklist

### **Backend:**
- [ ] Add database columns for receipt fields
- [ ] Create receipt upload endpoint
- [ ] Create receipt verification endpoint
- [ ] Update registration creation to accept receipt URL
- [ ] Add file storage for receipts
- [ ] Add receipt serving endpoint

### **Frontend - Registration Form:**
- [ ] Create ReceiptUpload component
- [ ] Add transactionReceiptUrl to FormData interface
- [ ] Add conditional receipt upload field
- [ ] Add validation for required receipt
- [ ] Update RegistrationRequest interface
- [ ] Update submitRegistration function
- [ ] Test file upload and validation

### **Frontend - Registrations Table:**
- [ ] Update RegistrationResponse interface
- [ ] Add receipt column to table
- [ ] Create receipt status badge function
- [ ] Create receipt view modal
- [ ] Add verification actions
- [ ] Add sorting/filtering support
- [ ] Update details modal with receipt info

### **Testing:**
- [ ] Test receipt upload in registration form
- [ ] Test conditional mandatory field
- [ ] Test receipt display in table
- [ ] Test receipt verification workflow
- [ ] Test file validation
- [ ] Test error handling

---

## 🎯 Summary

### **Requirements Understood:**

1. ✅ **Transaction Receipt Photo Upload:**
   - **IMAGES ONLY** - JPG, JPEG, PNG (NO PDF support)
   - Mandatory for EasyPaisa and Bank Account payments
   - Optional/Hidden for "By Hand on Test Date"
   - Maximum 5MB file size
   - **Advanced UI/UX:** Attractive, user-friendly design with clear instructions

2. ✅ **Registrations Table Display:**
   - Show receipt status (Uploaded/Missing/N/A)
   - Click to view receipt
   - Verification status (Pending/Verified/Rejected)

3. ✅ **Admin Verification:**
   - View receipt in modal
   - Mark as verified or rejected
   - Add verification notes
   - Track who verified and when

### **Implementation Approach:**
- Create new `ReceiptUpload` component (based on ProfileImageUpload)
- Add conditional field in registration form
- Add receipt column in registrations table
- Create receipt view/verification modal
- Add backend API endpoints for upload and verification

### **Ready for Implementation:** ✅ **YES**

---

**Analysis Complete** - Ready for implementation when approved! 🚀
