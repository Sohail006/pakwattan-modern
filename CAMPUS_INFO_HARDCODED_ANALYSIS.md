# 🏫 Campus Information Hardcoded Analysis

**Date:** Analysis Report  
**Status:** ⚠️ Campus information is hardcoded in multiple locations, not fetched from database

---

## 📋 Executive Summary

Campus information is currently **hardcoded** in multiple frontend components instead of being fetched from the database via the existing `/api/campuses` API endpoint. The API infrastructure exists and is functional, but the public-facing pages are not using it.

---

## 🔍 Hardcoded Campus Information Locations

### **1. Contact Page - Campus List** ❌

**File:** `components/contact/ContactInfo.tsx`  
**Lines:** 6-35  
**Status:** Hardcoded array of 4 campuses

**Hardcoded Data:**
```typescript
const campuses = [
  {
    name: 'Main Campus (Boys Wing)',
    address: 'Azam Khan road, beside Mubarak Plaza, Havelian, Abbottabad, KPK, Pakistan',
    phone: '0318 0821377',
    email: 'pakwattan2020@gmail.com',
    description: 'Main campus housing the boys wing and administrative offices'
  },
  {
    name: 'Primary Section',
    address: 'Gohar Market, Main Havelian City, Abbottabad, KPK, Pakistan',
    phone: '0318 0821377',
    email: 'pakwattan2020@gmail.com',
    description: 'Primary section located in the heart of Havelian city'
  },
  {
    name: 'Girls Campus',
    address: 'Havelian, Abbottabad, KPK, Pakistan',
    phone: '0318 0821377',
    email: 'pakwattan2020@gmail.com',
    description: 'Dedicated campus for female students'
  },
  {
    name: 'Secondary Campus',
    address: 'Havelian, Abbottabad, KPK, Pakistan',
    phone: '0318 0821377',
    email: 'pakwattan2020@gmail.com',
    description: 'Secondary education campus for advanced studies'
  }
]
```

**Issues:**
- ❌ Same phone number for all campuses (`0318 0821377`)
- ❌ Same email for all campuses (`pakwattan2020@gmail.com`)
- ❌ Incomplete addresses for some campuses
- ❌ No mobile number field
- ❌ No WhatsApp number field
- ❌ No office hours field
- ❌ Hardcoded count in quickStats (line 52: `value: '4'`)

**Used In:**
- Contact page (`/contact`)
- Displays campus cards with contact information

---

### **2. Contact Page - Map Section** ❌

**File:** `components/contact/MapSection.tsx`  
**Lines:** 7-32  
**Status:** Hardcoded array of 4 campuses (duplicate of ContactInfo)

**Hardcoded Data:**
```typescript
const campuses = [
  {
    name: 'Main Campus (Boys Wing)',
    address: 'Azam Khan road, beside Mubarak Plaza, Havelian, Abbottabad, KPK, Pakistan',
    phone: '0318 0821377',
    email: 'pakwattan2020@gmail.com'
  },
  // ... (same 4 campuses)
]
```

**Issues:**
- ❌ Duplicate hardcoded data
- ❌ Same phone/email for all
- ❌ Missing mobile/WhatsApp/office hours

**Used In:**
- Contact page (`/contact`)
- Map section with campus information cards

---

### **3. General School Contact Information** ⚠️

**File:** `lib/constants.ts`  
**Lines:** 6-22  
**Status:** Hardcoded in SCHOOL_INFO constant

**Hardcoded Data:**
```typescript
export const SCHOOL_INFO: SchoolInfo = {
  name: 'PAK WATTAN',
  fullName: 'Pak Wattan School & College of Sciences',
  established: 2020,
  description: 'Pak Wattan School & College of Sciences is committed to providing quality education with affordable expenses in Havelian, KPK.',
  logo: '/images/logo/logo_150x150.png',
  contact: {
    phone: '0318 0821377',
    email: 'pakwattan2020@gmail.com',
    address: 'Azam Khan road, beside Mubarak Plaza, Havelian, Abbottabad, KPK, Pakistan',
    socialMedia: {
      facebook: 'https://web.facebook.com/PAKWATTAN2020/',
      youtube: 'https://youtu.be/edf2-HxPxxs?si=Az95EFwCE2cY1UJP',
      twitter: 'https://twitter.com/WattanAnd?s=20&t=Fhqy3yMnnMGjq84gHEp5Sw'
    }
  }
}
```

**Used In:**
- `components/layout/Footer.tsx` - Contact info section
- `components/layout/Header.tsx` - Top bar contact info
- Multiple other components

**Note:** This appears to be the "main" contact info, which might be acceptable as a fallback, but should ideally come from the primary/main campus in the database.

---

### **4. Contact Hero Section** ⚠️

**File:** `components/contact/ContactHero.tsx`  
**Status:** Likely uses SCHOOL_INFO from constants

**Note:** Need to verify if this uses hardcoded data or SCHOOL_INFO constant.

---

### **5. Other Hardcoded References**

#### **A. Privacy Policy Page**
**File:** `components/privacy/PrivacyPolicy.tsx`  
**Line:** 358  
**Hardcoded:** `Phone: 0318 0821377`

#### **B. Terms of Service Page**
**File:** `components/terms/TermsOfService.tsx`  
**Lines:** 371-372  
**Hardcoded:**
- `Phone: 0318 0821377`
- `Address: Azam Khan road, beside Mubarak Plaza, Havelian, Abbottabad, KPK, Pakistan`

#### **C. Pakians Coaching Academy Registration**
**File:** `components/pakians-coaching-academy/PakiansCoachingAcademyRegistration.tsx`  
**Lines:** 212, 216, 220  
**Hardcoded:**
- Phone: `0318 0821377`
- Email: `pakwattan2020@gmail.com`
- Address: `Azam Khan road, beside Mubarak Plaza, Havelian, Abbottabad, KPK, Pakistan`

#### **D. Background History Page**
**File:** `components/about/BackgroundHistory.tsx`  
**Line:** 37-38  
**Hardcoded:** Mentions of "Azam Khan road" and "Gohar Market" in text content

---

## ✅ Existing API Infrastructure

### **Campus API - EXISTS AND FUNCTIONAL** ✅

**File:** `lib/api/campuses.ts`

**Available Endpoints:**
- ✅ `GET /api/campuses` - Get all campuses
- ✅ `GET /api/campuses?isActive={bool}` - Filter by active status
- ✅ `GET /api/campuses/{id}` - Get campus by ID
- ✅ `POST /api/campuses` - Create campus (Admin)
- ✅ `PUT /api/campuses/{id}` - Update campus (Admin)
- ✅ `DELETE /api/campuses/{id}` - Delete campus (Admin)

**Campus Interface:**
```typescript
export interface Campus {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  mobileNumber?: string;        // ✅ Available
  whatsAppNumber?: string;      // ✅ Available
  officeHours?: string;          // ✅ Available
  principalName?: string;
  priority?: number;
  isActive: boolean;
  createdAt: string;
}
```

**Status:** ✅ API is fully functional and used in the Contacts Dashboard (`/dashboard/contacts`)

---

## 📊 Comparison: Hardcoded vs Database

| Field | Hardcoded | Database API | Status |
|-------|-----------|--------------|--------|
| Campus Name | ✅ | ✅ | Both have |
| Address | ✅ | ✅ | Both have |
| Phone | ✅ | ✅ | Both have |
| Email | ✅ | ✅ | Both have |
| Mobile Number | ❌ | ✅ | **Missing in hardcoded** |
| WhatsApp Number | ❌ | ✅ | **Missing in hardcoded** |
| Office Hours | ❌ | ✅ | **Missing in hardcoded** |
| Principal Name | ❌ | ✅ | **Missing in hardcoded** |
| Priority | ❌ | ✅ | **Missing in hardcoded** |
| Active Status | ❌ | ✅ | **Missing in hardcoded** |

---

## 🎯 Impact Analysis

### **Problems with Current Hardcoded Approach:**

1. **Data Inconsistency**
   - Same phone/email for all campuses
   - Cannot have different contact info per campus
   - Updates require code changes and deployment

2. **Missing Information**
   - No mobile numbers displayed
   - No WhatsApp numbers displayed
   - No office hours displayed
   - No principal names displayed

3. **Maintenance Issues**
   - Changes require developer intervention
   - Cannot be updated by admin users
   - Risk of outdated information

4. **Scalability**
   - Adding/removing campuses requires code changes
   - Cannot dynamically show/hide inactive campuses

---

## 📝 Files That Need Updates

### **Priority 1: Public-Facing Pages**

1. **`components/contact/ContactInfo.tsx`**
   - Replace hardcoded `campuses` array with API call
   - Use `getCampuses(true)` to fetch active campuses
   - Display mobile, WhatsApp, office hours if available
   - Make campus count dynamic from API

2. **`components/contact/MapSection.tsx`**
   - Replace hardcoded `campuses` array with API call
   - Use same data source as ContactInfo

### **Priority 2: Supporting Pages**

3. **`components/contact/ContactHero.tsx`**
   - Verify if uses hardcoded data
   - Update to use primary/main campus from API

4. **`components/privacy/PrivacyPolicy.tsx`**
   - Replace hardcoded phone with API data

5. **`components/terms/TermsOfService.tsx`**
   - Replace hardcoded phone/address with API data

6. **`components/pakians-coaching-academy/PakiansCoachingAcademyRegistration.tsx`**
   - Replace hardcoded contact info with API data

### **Priority 3: Constants (Consider Refactoring)**

7. **`lib/constants.ts`**
   - Consider making `SCHOOL_INFO.contact` fetch from main campus
   - Or keep as fallback but prioritize API data

---

## 🔧 Recommended Implementation Approach

### **Step 1: Create Reusable Hook**

```typescript
// hooks/useCampuses.ts
export function useCampuses(activeOnly = true) {
  const [campuses, setCampuses] = useState<Campus[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getCampuses(activeOnly)
      .then(setCampuses)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [activeOnly])

  return { campuses, loading, error }
}
```

### **Step 2: Create Main Campus Helper**

```typescript
// lib/utils/campuses.ts
export function getMainCampus(campuses: Campus[]): Campus | null {
  // Get campus with highest priority, or first active campus
  return campuses
    .filter(c => c.isActive)
    .sort((a, b) => (b.priority || 0) - (a.priority || 0))[0] || null
}
```

### **Step 3: Update Components**

Replace hardcoded arrays with:
```typescript
const { campuses, loading, error } = useCampuses(true)
```

---

## 📈 Benefits of Migration

1. **✅ Dynamic Updates** - Admins can update campus info without code changes
2. **✅ Complete Information** - Display mobile, WhatsApp, office hours
3. **✅ Data Consistency** - Single source of truth (database)
4. **✅ Scalability** - Easy to add/remove campuses
5. **✅ Active Status** - Automatically hide inactive campuses
6. **✅ Priority Sorting** - Display campuses in correct order

---

## ⚠️ Considerations

1. **Fallback Data** - Keep `SCHOOL_INFO` as fallback if API fails
2. **Loading States** - Show loading indicators while fetching
3. **Error Handling** - Gracefully handle API errors
4. **Caching** - Consider caching campus data to reduce API calls
5. **SEO** - Ensure campus info is available for SEO (SSR/SSG)

---

## 📌 Summary

**Total Hardcoded Locations:** 7+ files  
**API Status:** ✅ Fully functional  
**Migration Complexity:** Medium  
**Priority:** High (affects public-facing contact information)

**Recommendation:** Migrate all hardcoded campus information to use the existing `/api/campuses` API endpoint to ensure data consistency and enable admin-managed updates.

