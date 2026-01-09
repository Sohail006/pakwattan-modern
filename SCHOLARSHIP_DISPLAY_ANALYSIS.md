# 🔍 Scholarship Display Issue Analysis - Registrations Table

**Date:** Analysis Date  
**Status:** 📋 Analysis Complete  
**Component:** `/dashboard/registrations` page - `RegistrationsTable.tsx`

---

## 🎯 Issue Identified

### **Problem:**
- In the registrations table, the Scholarship column shows the scholarship type ID (e.g., "6") instead of the scholarship type name (e.g., "Merit Based Scholarship")
- This makes it difficult for users to understand which scholarship type was applied for

### **Locations:**
1. **File:** `components/registrations/RegistrationsTable.tsx`
   - **Line 709:** Scholarship column in table (hidden on mobile, visible on lg screens)
   - **Line 881:** Scholarship field in registration details modal

---

## 🔍 Root Cause Analysis

### **Current Implementation:**

**Location 1 - Table Column (Line 707-710):**
```tsx
{reg.applyForScholarship ? (
  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md truncate max-w-full">
    {reg.scholarshipType || 'Yes'}  // ⚠️ Shows ID (e.g., "6")
  </span>
) : (
  <span className="text-sm text-gray-400 font-medium">No</span>
)}
```

**Location 2 - Details Modal (Line 879-883):**
```tsx
<p className="text-sm font-semibold text-gray-500 mb-1">Scholarship</p>
<p className="text-gray-900">
  {viewingDetails.applyForScholarship 
    ? (viewingDetails.scholarshipType || 'Yes')  // ⚠️ Shows ID (e.g., "6")
    : 'No'}
</p>
```

### **Data Structure:**

**RegistrationResponse Interface** (`lib/api/registrations.ts` - Line 43):
```typescript
export interface RegistrationResponse {
  // ...
  applyForScholarship: boolean;
  scholarshipType?: string;  // ⚠️ This is the ID as a string (e.g., "6")
  // ...
}
```

**ScholarshipType Interface** (`lib/api/admissionSettings.ts` - Line 131):
```typescript
export interface ScholarshipType {
  id: number;        // The ID (e.g., 6)
  name: string;      // The name (e.g., "Merit Based Scholarship")
  // ...
}
```

### **Problem Flow:**

1. **Backend Response:**
   - Backend returns `scholarshipType: "6"` (ID as string) in `RegistrationResponse`
   - The actual scholarship name is not included in the response

2. **Frontend Display:**
   - Table directly displays `reg.scholarshipType` which is "6"
   - No mapping from ID to name is performed

3. **Missing Logic:**
   - Component doesn't fetch scholarship types from API
   - No ID-to-name mapping exists
   - No lookup mechanism to convert ID to name

---

## 💡 Solution

### **Approach:**
Fetch scholarship types from API and create a mapping from ID to name, then use that mapping to display the correct name.

### **Implementation Steps:**

1. **Import Required API:**
   ```typescript
   import { getAllScholarshipTypes } from '@/lib/api/admissionSettings'
   import type { ScholarshipType } from '@/lib/api/admissionSettings'
   ```

2. **Add State for Scholarship Types:**
   ```typescript
   const [scholarshipTypes, setScholarshipTypes] = useState<ScholarshipType[]>([])
   const [scholarshipTypeMap, setScholarshipTypeMap] = useState<Map<number, string>>(new Map())
   ```

3. **Load Scholarship Types on Mount:**
   ```typescript
   useEffect(() => {
     const loadScholarshipTypes = async () => {
       try {
         const types = await getAllScholarshipTypes()
         setScholarshipTypes(types)
         // Create ID to name mapping
         const map = new Map<number, string>()
         types.forEach(type => {
           map.set(type.id, type.name)
         })
         setScholarshipTypeMap(map)
       } catch (error) {
         console.warn('[RegistrationsTable] Failed to load scholarship types:', error)
       }
     }
     loadScholarshipTypes()
   }, [])
   ```

4. **Update Display Logic:**
   ```tsx
   {reg.applyForScholarship ? (
     <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md truncate max-w-full">
       {reg.scholarshipType 
         ? (scholarshipTypeMap.get(Number(reg.scholarshipType)) || reg.scholarshipType)
         : 'Yes'}
     </span>
   ) : (
     <span className="text-sm text-gray-400 font-medium">No</span>
   )}
   ```

### **Alternative Approach (Simpler):**
Use a useMemo to create the map from scholarship types array:

```typescript
const scholarshipTypeMap = useMemo(() => {
  const map = new Map<number, string>()
  scholarshipTypes.forEach(type => {
    map.set(type.id, type.name)
  })
  return map
}, [scholarshipTypes])
```

---

## 📋 Implementation Checklist

- [ ] Import `getAllScholarshipTypes` and `ScholarshipType` type
- [ ] Add state for scholarship types array
- [ ] Add useEffect to load scholarship types on component mount
- [ ] Create ID-to-name mapping (Map or object)
- [ ] Update display logic to use mapping
- [ ] Handle edge cases (missing ID, API failure, etc.)
- [ ] Test with different scholarship types
- [ ] Verify fallback behavior

---

## 🧪 Test Scenarios

### **Test Case 1: Scholarship Type ID Exists**
- **Setup:** `reg.scholarshipType = "6"`, scholarship type with ID 6 exists
- **Expected:** Display "Merit Based Scholarship" (or actual name)
- **Status:** ⏳ Pending

### **Test Case 2: Scholarship Type ID Missing**
- **Setup:** `reg.scholarshipType = "999"`, scholarship type doesn't exist
- **Expected:** Display "999" (fallback to ID)
- **Status:** ⏳ Pending

### **Test Case 3: Scholarship Type Not Loaded**
- **Setup:** API fails to load scholarship types
- **Expected:** Display ID as fallback
- **Status:** ⏳ Pending

### **Test Case 4: No Scholarship Type**
- **Setup:** `reg.scholarshipType = undefined` but `applyForScholarship = true`
- **Expected:** Display "Yes"
- **Status:** ⏳ Pending

### **Test Case 5: Multiple Scholarship Types**
- **Setup:** Table with registrations having different scholarship types
- **Expected:** All display correct names
- **Status:** ⏳ Pending

---

## 🔧 Code Changes Required

### **File: `components/registrations/RegistrationsTable.tsx`**

**Changes Needed:**

1. **Add Import** (after line 5):
   ```typescript
   import { getAllScholarshipTypes } from '@/lib/api/admissionSettings'
   import type { ScholarshipType } from '@/lib/api/admissionSettings'
   ```

2. **Add State** (after line 19):
   ```typescript
   const [scholarshipTypes, setScholarshipTypes] = useState<ScholarshipType[]>([])
   ```

3. **Add useEffect** (after line 79):
   ```typescript
   // Load scholarship types for ID-to-name mapping
   useEffect(() => {
     const loadScholarshipTypes = async () => {
       try {
         const types = await getAllScholarshipTypes()
         setScholarshipTypes(types)
       } catch (error) {
         console.warn('[RegistrationsTable] Failed to load scholarship types:', error)
       }
     }
     loadScholarshipTypes()
   }, [])
   ```

4. **Create Mapping** (useMemo, after filteredRegistrations):
   ```typescript
   const scholarshipTypeMap = useMemo(() => {
     const map = new Map<number, string>()
     scholarshipTypes.forEach(type => {
       map.set(type.id, type.name)
     })
     return map
   }, [scholarshipTypes])
   ```

5. **Update Display in Table** (line 709):
   ```typescript
   {reg.scholarshipType 
     ? (scholarshipTypeMap.get(Number(reg.scholarshipType)) || reg.scholarshipType)
     : 'Yes'}
   ```

6. **Update Display in Details Modal** (line 881):
   ```typescript
   {viewingDetails.applyForScholarship 
     ? (viewingDetails.scholarshipType 
         ? (scholarshipTypeMap.get(Number(viewingDetails.scholarshipType)) || viewingDetails.scholarshipType)
         : 'Yes') 
     : 'No'}
   ```

---

## 📝 Notes

1. **Type Conversion:**
   - `reg.scholarshipType` is `string | undefined`
   - Need to convert to `number` for Map lookup: `Number(reg.scholarshipType)`

2. **Fallback Strategy:**
   - If mapping fails, display the ID (better than nothing)
   - If scholarshipType is undefined, display "Yes" (current behavior)

3. **Performance:**
   - Map lookup is O(1), very efficient
   - Scholarship types loaded once on mount
   - No impact on table rendering performance

4. **Backend Consideration:**
   - Ideally, backend should return scholarship name in response
   - Current fix works with existing backend response
   - Can be improved later if backend is updated

---

## ✅ Summary

**Issue:** Scholarship column shows ID (6) instead of name  
**Root Cause:** No ID-to-name mapping in component  
**Solution:** Fetch scholarship types and create mapping  
**Impact:** Low (display only, no functional impact)  
**Priority:** 🟡 Medium (UX improvement)

**Ready for Implementation:** ✅ Yes
