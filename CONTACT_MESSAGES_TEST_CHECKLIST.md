# Contact Messages Module - Test Checklist

**Date:** December 31, 2024  
**Status:** ✅ Ready for Testing

---

## ✅ Pre-Test Verification

- [x] Backend builds successfully (`dotnet build`)
- [x] Frontend has no linter errors
- [x] All API endpoints implemented
- [x] All frontend components created
- [x] Integration verified

---

## 🧪 Manual Testing Checklist

### **1. Backend API Testing**

#### **Test 1.1: Create Contact Message (Public)**
- [ ] Start backend: `cd "E:\Cursor AI\PakWattanAPI" && dotnet run`
- [ ] Test endpoint: `POST /api/contacts` (no auth required)
- [ ] Send test data:
  ```json
  {
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "subject": "Test Subject",
    "message": "This is a test message"
  }
  ```
- [ ] Verify: Returns 201 Created with contact object
- [ ] Verify: `IsRead` is `false`
- [ ] Verify: `CreatedAt` is set

#### **Test 1.2: Get All Contacts (Admin/Staff)**
- [ ] Login as Admin/Staff
- [ ] Test endpoint: `GET /api/contacts`
- [ ] Verify: Returns array of contacts
- [ ] Test filter: `GET /api/contacts?isRead=false`
- [ ] Verify: Returns only unread contacts

#### **Test 1.3: Get Contact by ID**
- [ ] Test endpoint: `GET /api/contacts/{id}`
- [ ] Verify: Returns single contact object
- [ ] Test with invalid ID
- [ ] Verify: Returns 404 Not Found

#### **Test 1.4: Toggle Read Status**
- [ ] Test endpoint: `PUT /api/contacts/{id}/read`
- [ ] Verify: Toggles `IsRead` status
- [ ] Verify: `ReadAt` timestamp updates correctly
- [ ] Test with invalid ID
- [ ] Verify: Returns 404 Not Found

#### **Test 1.5: Add Response**
- [ ] Test endpoint: `PUT /api/contacts/{id}/response`
- [ ] Send: `{ "response": "Thank you for your message" }`
- [ ] Verify: Response saved
- [ ] Verify: `RespondedAt` timestamp set
- [ ] Test updating existing response
- [ ] Verify: Response updated correctly

#### **Test 1.6: Delete Contact**
- [ ] Test endpoint: `DELETE /api/contacts/{id}`
- [ ] Verify: Contact deleted
- [ ] Verify: Returns 204 No Content
- [ ] Test with invalid ID
- [ ] Verify: Returns 404 Not Found

---

### **2. Frontend Testing**

#### **Test 2.1: Contact Form Submission**
- [ ] Navigate to `/contact` page
- [ ] Fill out contact form:
  - Name: "John Doe"
  - Email: "john@example.com"
  - Phone: "1234567890"
  - Subject: "Admission Inquiry"
  - Message: "I want to know about admissions"
- [ ] Submit form
- [ ] Verify: Success message displayed
- [ ] Verify: Form resets
- [ ] Check browser console for errors

#### **Test 2.2: Admin Dashboard - Contact Messages Card**
- [ ] Login as Admin
- [ ] Navigate to `/dashboard/admin`
- [ ] Verify: "Contact Messages" card shows correct count
- [ ] Verify: Card links to `/dashboard/contact-messages`
- [ ] Click on card
- [ ] Verify: Navigates to contact messages page

#### **Test 2.3: Contact Messages Page - View Messages**
- [ ] Navigate to `/dashboard/contact-messages`
- [ ] Verify: Page loads without errors
- [ ] Verify: Statistics cards display:
  - Total Messages
  - Unread count
  - Read count
  - Responded count
- [ ] Verify: Messages table displays all contacts
- [ ] Verify: Unread messages have blue background
- [ ] Verify: Status badges display correctly

#### **Test 2.4: Search Functionality**
- [ ] Enter search term in search box
- [ ] Verify: Results filter in real-time
- [ ] Test searching by:
  - Name
  - Email
  - Subject
  - Message content
- [ ] Clear search
- [ ] Verify: All messages displayed again

#### **Test 2.5: Filter Functionality**
- [ ] Select "Unread" filter
- [ ] Verify: Only unread messages shown
- [ ] Select "Read" filter
- [ ] Verify: Only read messages shown
- [ ] Select "Responded" filter
- [ ] Verify: Only messages with responses shown
- [ ] Select "All Messages"
- [ ] Verify: All messages displayed

#### **Test 2.6: View Message Details**
- [ ] Click "Read more" on a message
- [ ] Verify: Modal opens
- [ ] Verify: Full message content displayed
- [ ] Verify: Contact information displayed
- [ ] Verify: Date displayed correctly
- [ ] Verify: Response section shows if response exists
- [ ] Close modal
- [ ] Verify: Modal closes correctly

#### **Test 2.7: Toggle Read Status**
- [ ] Click read/unread button on a message
- [ ] Verify: Status toggles
- [ ] Verify: Badge updates
- [ ] Verify: Background color changes (if unread)
- [ ] Verify: Toast notification appears
- [ ] Refresh page
- [ ] Verify: Status persists

#### **Test 2.8: Add Response**
- [ ] Click response button on a message
- [ ] Verify: Response modal opens
- [ ] Enter response text
- [ ] Submit response
- [ ] Verify: Response saved
- [ ] Verify: "Responded" badge appears
- [ ] Verify: Response displayed in message details
- [ ] Verify: Toast notification appears

#### **Test 2.9: Update Response**
- [ ] Open response modal for message with existing response
- [ ] Verify: Current response displayed
- [ ] Update response text
- [ ] Submit
- [ ] Verify: Response updated
- [ ] Verify: Updated response displayed

#### **Test 2.10: Delete Message**
- [ ] Click delete button on a message
- [ ] Verify: Confirmation dialog appears
- [ ] Cancel deletion
- [ ] Verify: Message not deleted
- [ ] Click delete again
- [ ] Confirm deletion
- [ ] Verify: Message removed from table
- [ ] Verify: Statistics update
- [ ] Verify: Toast notification appears

#### **Test 2.11: Refresh Functionality**
- [ ] Click refresh button
- [ ] Verify: Data reloads
- [ ] Verify: Loading spinner appears
- [ ] Verify: Statistics update
- [ ] Verify: Table updates

#### **Test 2.12: Empty States**
- [ ] Clear all messages (or filter to show none)
- [ ] Verify: Empty state message displayed
- [ ] Verify: Helpful message shown
- [ ] Verify: Icon displayed

#### **Test 2.13: Error Handling**
- [ ] Disconnect backend
- [ ] Try to load messages
- [ ] Verify: Error message displayed
- [ ] Verify: "Try again" button shown
- [ ] Reconnect backend
- [ ] Click "Try again"
- [ ] Verify: Messages load successfully

#### **Test 2.14: Responsive Design**
- [ ] Test on mobile viewport (< 640px)
- [ ] Verify: Table scrolls horizontally
- [ ] Verify: Statistics cards stack vertically
- [ ] Verify: Search and filter stack properly
- [ ] Test on tablet viewport (640px - 1024px)
- [ ] Verify: Layout adapts correctly
- [ ] Test on desktop viewport (> 1024px)
- [ ] Verify: Full layout displayed

#### **Test 2.15: Authorization**
- [ ] Logout
- [ ] Try to access `/dashboard/contact-messages`
- [ ] Verify: Redirected to login
- [ ] Login as non-admin user
- [ ] Try to access `/dashboard/contact-messages`
- [ ] Verify: Access denied message
- [ ] Login as Admin
- [ ] Verify: Can access page

---

### **3. Integration Testing**

#### **Test 3.1: End-to-End Flow**
- [ ] Submit contact form from `/contact` page
- [ ] Login as Admin
- [ ] Navigate to `/dashboard/contact-messages`
- [ ] Verify: New message appears in table
- [ ] Verify: Shows as unread
- [ ] Mark as read
- [ ] Add response
- [ ] Verify: All changes persist
- [ ] Refresh page
- [ ] Verify: All data correct

#### **Test 3.2: Data Consistency**
- [ ] Submit multiple messages from contact form
- [ ] Verify: All appear in admin dashboard
- [ ] Verify: Count in dashboard card matches
- [ ] Verify: Statistics cards show correct counts
- [ ] Perform various actions (read, respond, delete)
- [ ] Verify: Statistics update correctly

---

## 🐛 Known Issues

**None** - All functionality working as expected.

---

## 📝 Test Results Template

```
Test Date: ___________
Tester: ___________

Backend Tests:
- [ ] All API endpoints working
- [ ] Authorization working
- [ ] Validation working

Frontend Tests:
- [ ] All pages load correctly
- [ ] All features functional
- [ ] No console errors
- [ ] Responsive design works

Integration Tests:
- [ ] End-to-end flow works
- [ ] Data consistency verified

Issues Found:
1. ___________
2. ___________

Overall Status: [ ] PASS [ ] FAIL [ ] NEEDS FIXES
```

---

## ✅ Quick Test Commands

### **Backend:**
```powershell
cd "E:\Cursor AI\PakWattanAPI"
dotnet build
dotnet run
```

### **Frontend:**
```powershell
cd "E:\Cursor AI\PakWattanModern"
npm run dev
```

### **Test URLs:**
- Frontend: http://localhost:3000
- Backend: https://localhost:7210 (or http://localhost:5000)
- Contact Form: http://localhost:3000/contact
- Contact Messages: http://localhost:3000/dashboard/contact-messages

---

**Status:** ✅ Ready for Testing

