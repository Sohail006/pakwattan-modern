# 🧪 Contacts Dashboard - Test Plan

**Date:** December 24, 2024  
**Status:** Ready for Testing  
**Backend:** `E:\Cursor AI\PakWattanAPI`  
**Frontend:** `E:\Cursor AI\PakWattanModern`

---

## ✅ Pre-Test Checklist

### Backend Verification
- [x] Models created (ITSupportTeam, Coordinator, ContactPerson)
- [x] DTOs created (ITSupportDtos, CoordinatorDtos, ContactPersonDtos)
- [x] Services implemented (IITSupportService, ICoordinatorService, IContactPersonService)
- [x] Controllers created (ITSupportController, CoordinatorsController, ContactPersonsController)
- [x] Database migration applied (`AddContactsManagement`)
- [x] Services registered in Program.cs
- [x] AutoMapper mappings configured

### Frontend Verification
- [x] API clients created (itSupport.ts, coordinators.ts, contactPersons.ts)
- [x] Contacts Dashboard page created (`app/dashboard/contacts/page.tsx`)
- [x] Components implemented (ContactsDashboard, UnifiedContactsTable, Forms, etc.)
- [x] Error handling for 404 responses
- [x] TypeScript types defined

---

## 🧪 Test Scenarios

### 1. Backend API Tests

#### 1.1 IT Support API (`/api/it-support`)

**Test 1.1.1: GET All IT Support Entries**
```http
GET /api/it-support
Authorization: Bearer {token}
Expected: 200 OK, Array of ITSupportResponseDto
```

**Test 1.1.2: GET IT Support by ID**
```http
GET /api/it-support/{id}
Authorization: Bearer {token}
Expected: 200 OK, ITSupportResponseDto
```

**Test 1.1.3: CREATE IT Support Entry**
```http
POST /api/it-support
Authorization: Bearer {token}
Content-Type: application/json
Body: {
  "title": "IT Support Team",
  "email": "it@pakwattan.edu.pk",
  "mobileNumber": "0318 0821377",
  "whatsAppNumber": "0318 0821377",
  "officeHours": "Monday-Friday: 9AM-5PM",
  "department": "IT Department",
  "priority": 1,
  "isActive": true
}
Expected: 201 Created, ITSupportResponseDto
```

**Test 1.1.4: UPDATE IT Support Entry**
```http
PUT /api/it-support/{id}
Authorization: Bearer {token}
Content-Type: application/json
Body: {
  "title": "IT Support Team - Updated",
  "priority": 2
}
Expected: 204 No Content
```

**Test 1.1.5: DELETE IT Support Entry (Soft Delete)**
```http
DELETE /api/it-support/{id}
Authorization: Bearer {token}
Expected: 204 No Content
```

#### 1.2 Coordinators API (`/api/coordinators`)

**Test 1.2.1: GET All Coordinators**
```http
GET /api/coordinators
Authorization: Bearer {token}
Expected: 200 OK, Array of CoordinatorResponseDto
```

**Test 1.2.2: GET Coordinators by Campus**
```http
GET /api/coordinators?campusId=1
Authorization: Bearer {token}
Expected: 200 OK, Filtered Array
```

**Test 1.2.3: CREATE Coordinator**
```http
POST /api/coordinators
Authorization: Bearer {token}
Content-Type: application/json
Body: {
  "firstName": "John",
  "lastName": "Doe",
  "title": "Academic Coordinator",
  "email": "john.doe@pakwattan.edu.pk",
  "mobileNumber": "0318 0821377",
  "campusId": 1,
  "department": "Academics",
  "priority": 1,
  "isActive": true
}
Expected: 201 Created, CoordinatorResponseDto
```

**Test 1.2.4: UPDATE Coordinator**
```http
PUT /api/coordinators/{id}
Authorization: Bearer {token}
Content-Type: application/json
Body: {
  "title": "Senior Academic Coordinator"
}
Expected: 204 No Content
```

**Test 1.2.5: DELETE Coordinator**
```http
DELETE /api/coordinators/{id}
Authorization: Bearer {token}
Expected: 204 No Content
```

#### 1.3 Contact Persons API (`/api/contact-persons`)

**Test 1.3.1: GET All Contact Persons**
```http
GET /api/contact-persons
Authorization: Bearer {token}
Expected: 200 OK, Array of ContactPersonResponseDto
```

**Test 1.3.2: GET Contact Persons by Type**
```http
GET /api/contact-persons?type=Administration
Authorization: Bearer {token}
Expected: 200 OK, Filtered Array
```

**Test 1.3.3: CREATE Contact Person**
```http
POST /api/contact-persons
Authorization: Bearer {token}
Content-Type: application/json
Body: {
  "contactType": "Administration",
  "name": "Jane Smith",
  "title": "Administrative Officer",
  "email": "jane.smith@pakwattan.edu.pk",
  "mobileNumber": "0318 0821377",
  "department": "Administration",
  "priority": 1,
  "isActive": true
}
Expected: 201 Created, ContactPersonResponseDto
```

**Test 1.3.4: UPDATE Contact Person**
```http
PUT /api/contact-persons/{id}
Authorization: Bearer {token}
Content-Type: application/json
Body: {
  "title": "Senior Administrative Officer"
}
Expected: 204 No Content
```

**Test 1.3.5: DELETE Contact Person**
```http
DELETE /api/contact-persons/{id}
Authorization: Bearer {token}
Expected: 204 No Content
```

---

### 2. Frontend UI Tests

#### 2.1 Dashboard Access
- [ ] Navigate to `/dashboard/contacts`
- [ ] Verify authentication check (Admin/Staff only)
- [ ] Verify page loads without errors
- [ ] Verify loading state displays correctly

#### 2.2 Quick Stats Cards
- [ ] Verify total contacts count displays
- [ ] Verify active contacts count displays
- [ ] Verify campus count displays
- [ ] Verify coordinator count displays

#### 2.3 Search and Filter
- [ ] Test global search functionality
- [ ] Test status filter (All/Active/Inactive)
- [ ] Test type filter (All/IT Support/Campuses/Coordinators/Other)
- [ ] Test view mode toggle (Table/Card)
- [ ] Test refresh button
- [ ] Test export button

#### 2.4 IT Support Tab
- [ ] Verify IT Support tab displays
- [ ] Verify "Add IT Support" button works
- [ ] Test creating new IT Support entry
- [ ] Test editing existing IT Support entry
- [ ] Test deleting IT Support entry
- [ ] Test phone number auto-formatting
- [ ] Test form validation

#### 2.5 Coordinators Tab
- [ ] Verify Coordinators tab displays
- [ ] Verify "Add Coordinator" button works
- [ ] Test creating new Coordinator
- [ ] Test editing existing Coordinator
- [ ] Test deleting Coordinator
- [ ] Test campus dropdown in form
- [ ] Test form validation

#### 2.6 Contact Persons Tab
- [ ] Verify Contact Persons tab displays
- [ ] Verify "Add Contact Person" button works
- [ ] Test creating new Contact Person
- [ ] Test editing existing Contact Person
- [ ] Test deleting Contact Person
- [ ] Test contact type selection
- [ ] Test form validation

#### 2.7 Campuses Tab
- [ ] Verify Campuses tab displays
- [ ] Verify campus data loads correctly
- [ ] Test editing campus (with new fields: mobileNumber, whatsAppNumber, officeHours, priority)

#### 2.8 Bulk Operations
- [ ] Test selecting multiple contacts
- [ ] Test bulk activate
- [ ] Test bulk deactivate
- [ ] Test bulk delete
- [ ] Test bulk export

#### 2.9 Quick Actions
- [ ] Test "Call" button (opens tel: link)
- [ ] Test "Email" button (opens mailto: link)
- [ ] Test "WhatsApp" button (opens WhatsApp link)
- [ ] Test "Copy" button (copies contact info)

#### 2.10 Keyboard Shortcuts
- [ ] Test Ctrl/Cmd + N (Add new)
- [ ] Test Ctrl/Cmd + R (Refresh)
- [ ] Test Ctrl/Cmd + K or / (Focus search)
- [ ] Test Escape (Clear filters)

#### 2.11 Responsive Design
- [ ] Test on mobile viewport (< 768px)
- [ ] Test on tablet viewport (768px - 1024px)
- [ ] Test on desktop viewport (> 1024px)
- [ ] Verify card view on mobile
- [ ] Verify table view on desktop

---

### 3. Error Handling Tests

#### 3.1 Network Errors
- [ ] Test behavior when API is unreachable
- [ ] Test behavior when API returns 500 error
- [ ] Test behavior when API returns 401 (unauthorized)
- [ ] Test behavior when API returns 403 (forbidden)

#### 3.2 Validation Errors
- [ ] Test required field validation
- [ ] Test email format validation
- [ ] Test phone number format validation
- [ ] Test error messages display correctly

#### 3.3 404 Handling (Before Backend Implementation)
- [x] Verify GET requests return empty array on 404
- [x] Verify POST/PUT/DELETE show user-friendly message on 404

---

### 4. Integration Tests

#### 4.1 End-to-End Flow
1. Create IT Support entry
2. Verify it appears in the list
3. Edit the entry
4. Verify changes are reflected
5. Delete the entry
6. Verify it's removed from the list

#### 4.2 Data Consistency
- [ ] Verify created entries have correct timestamps
- [ ] Verify soft-deleted entries don't appear in active list
- [ ] Verify campus relationship works for coordinators
- [ ] Verify priority sorting works correctly

---

## 🚀 How to Run Tests

### Option 1: Manual Testing via Browser

1. **Start Backend API:**
   ```powershell
   cd "E:\Cursor AI\PakWattanAPI"
   dotnet run
   ```
   Backend should start on `https://localhost:7210` or configured port

2. **Start Frontend:**
   ```powershell
   cd "E:\Cursor AI\PakWattanModern"
   npm run dev
   ```
   Frontend should start on `http://localhost:3000`

3. **Access Dashboard:**
   - Navigate to: `http://localhost:3000/dashboard/contacts`
   - Login as Admin or Staff user
   - Test all features manually

### Option 2: API Testing via Swagger/Postman

1. **Start Backend API** (as above)
2. **Access Swagger UI:**
   - Navigate to: `https://localhost:7210/swagger`
   - Test endpoints directly

3. **Or use Postman:**
   - Import API endpoints
   - Test with authentication token

### Option 3: Automated Testing (Future)

- Create integration tests using Jest/Playwright
- Create API tests using xUnit/NUnit

---

## 📊 Expected Results

### Success Criteria
- ✅ All API endpoints return correct status codes
- ✅ All CRUD operations work correctly
- ✅ Frontend displays data correctly
- ✅ Forms validate input correctly
- ✅ Error messages are user-friendly
- ✅ No console errors in browser
- ✅ No TypeScript compilation errors
- ✅ Responsive design works on all devices

### Known Issues
- None currently identified

---

## 📝 Test Results Template

```
Test Date: ___________
Tester: ___________
Environment: [ ] Local [ ] Production

### Backend API Tests
- [ ] IT Support API - All tests passed
- [ ] Coordinators API - All tests passed
- [ ] Contact Persons API - All tests passed

### Frontend UI Tests
- [ ] Dashboard Access - Passed
- [ ] Quick Stats - Passed
- [ ] Search/Filter - Passed
- [ ] IT Support Tab - Passed
- [ ] Coordinators Tab - Passed
- [ ] Contact Persons Tab - Passed
- [ ] Campuses Tab - Passed
- [ ] Bulk Operations - Passed
- [ ] Quick Actions - Passed
- [ ] Keyboard Shortcuts - Passed
- [ ] Responsive Design - Passed

### Error Handling
- [ ] Network Errors - Handled correctly
- [ ] Validation Errors - Handled correctly

### Integration Tests
- [ ] End-to-End Flow - Passed
- [ ] Data Consistency - Passed

### Issues Found:
1. ___________
2. ___________

### Notes:
___________
```

---

**Status:** ✅ Ready for Testing  
**Next Steps:** Run manual tests and document results
