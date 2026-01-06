# Currency Format Analysis - Standardization to PKR

## Executive Summary

This document analyzes all currency formats used across the Pak Wattan Modern website and provides recommendations for standardizing to **PKR** format throughout the site.

**Current Status:** Multiple currency formats are used inconsistently  
**Target:** Standardize to **PKR** format everywhere  
**Priority:** Medium-High (affects user experience and consistency)

---

## Current Currency Formats Found

### 1. **₨ (Rupee Symbol)** - Most Common
**Usage:** Scholarships pages, statistics, data tables  
**Examples:**
- `₨1,043,500` (ScholarshipDataTables.tsx)
- `₨32,000 - ₨83,000` (scholarship-data.ts)
- `₨15.0 Lacs` (ScholarshipStats.tsx)

**Files Using ₨:**
- `components/scholarships/ScholarshipStats.tsx` (Lines 13, 15)
- `components/scholarships/ScholarshipDataTables.tsx` (Lines 77, 88, 162)
- `lib/scholarship-data.ts` (Lines 24, 30, 36, 42)

**Count:** ~10+ instances

---

### 2. **PKR (Pakistani Rupee)** - Already Used in Some Places
**Usage:** Registration form, job application form  
**Examples:**
- `PKR 500/-` (StudentRegistrationForm.tsx)
- `PKR 50,000 - 80,000` (JobApplicationForm.tsx)

**Files Using PKR:**
- `components/registration-form/StudentRegistrationForm.tsx` (Line 21)
- `components/jobs/JobApplicationForm.tsx` (Lines 599, 604, 623)

**Count:** ~5+ instances

---

### 3. **Rs (Without Symbol)** - Fee Structure
**Usage:** Fee structure table  
**Examples:**
- `Rs4,500` (FeeStructure.tsx)
- `Rs12,000` (FeeStructure.tsx)
- `All fees are in Pakistani Rupees (Rs)` (FeeStructure.tsx)

**Files Using Rs:**
- `components/admission/FeeStructure.tsx` (Lines 9-23, 64)

**Count:** ~50+ instances (all fee data entries)

---

### 4. **Rs: (With Colon)** - Test Rules
**Usage:** Registration form test rules  
**Examples:**
- `Rs: 500/-` (StudentRegistrationForm.tsx)

**Files Using Rs::**
- `components/registration-form/StudentRegistrationForm.tsx` (Line 27)

**Count:** 1 instance

---

## Detailed File-by-File Analysis

### **Scholarships Section** (`/scholarships`)

#### 1. `components/scholarships/ScholarshipStats.tsx`
**Current Format:** `₨`
**Locations:**
- Line 13: `₨${(amount / 100000).toFixed(1)} Lacs`
- Line 15: `₨${amount.toLocaleString()}`
- Used in: Total Scholarship Amount, Average Amount displays

**Example Output:**
- `₨15.0 Lacs`
- `₨7,500`

**Recommended Change:**
```typescript
// Current
return `₨${(amount / 100000).toFixed(1)} Lacs`
return `₨${amount.toLocaleString()}`

// Recommended
return `PKR ${(amount / 100000).toFixed(1)} Lacs`
return `PKR ${amount.toLocaleString()}`
```

---

#### 2. `components/scholarships/ScholarshipDataTables.tsx`
**Current Format:** `₨`
**Locations:**
- Line 77: `₨{totalAmount.toLocaleString()}` (Total Amount card)
- Line 88: `₨{filteredStudents.length > 0 ? Math.round(totalAmount / filteredStudents.length).toLocaleString() : 0}` (Average Amount card)
- Line 162: `₨{student.amount.toLocaleString()}` (Table rows)

**Example Output:**
- `₨1,043,500` ← **This is what the user mentioned**
- `₨52,175` (average)
- `₨66,500` (individual student amounts)

**Recommended Change:**
```typescript
// Current
₨{totalAmount.toLocaleString()}
₨{student.amount.toLocaleString()}

// Recommended
PKR {totalAmount.toLocaleString()}
PKR {student.amount.toLocaleString()}
```

---

#### 3. `lib/scholarship-data.ts`
**Current Format:** `₨` in string literals
**Locations:**
- Line 24: `amount: "₨32,000 - ₨83,000"`
- Line 30: `amount: "₨32,000 - ₨66,500"`
- Line 36: `amount: "₨32,000"`
- Line 42: `amount: "₨32,000 - ₨66,500"`

**Example Output:**
- `₨32,000 - ₨83,000` (Merit Based Scholarship)
- `₨32,000 - ₨66,500` (Orphans Scholarship)
- `₨32,000` (Special child Scholarship)

**Recommended Change:**
```typescript
// Current
amount: "₨32,000 - ₨83,000"

// Recommended
amount: "PKR 32,000 - PKR 83,000"
// OR
amount: "PKR 32,000 - 83,000" (cleaner)
```

---

### **Registration Form**

#### 4. `components/registration-form/StudentRegistrationForm.tsx`
**Current Format:** Mixed (`PKR` and `Rs:`)
**Locations:**
- Line 21: `PKR ${amount}/-` ✅ (Already using PKR)
- Line 27: `Rs: ${amount}/-` ⚠️ (Using Rs:)

**Status:**
- ✅ `formatRegistrationFee()` - Already uses PKR
- ⚠️ `formatRegistrationFeeRs()` - Uses Rs: (for test rules)

**Recommended Change:**
```typescript
// Current
const formatRegistrationFeeRs = (fee: number | undefined): string => {
  return `Rs: ${amount}/-`
}

// Recommended
const formatRegistrationFeeRs = (fee: number | undefined): string => {
  return `PKR ${amount}/-`
}
```

---

### **Fee Structure**

#### 5. `components/admission/FeeStructure.tsx`
**Current Format:** `Rs` (without symbol, no space)
**Locations:**
- Lines 9-23: All fee data entries (`Rs4,500`, `Rs12,000`, etc.)
- Line 64: Description text `"All fees are in Pakistani Rupees (Rs)"`

**Example Output:**
- `Rs4,500` (Monthly Fee)
- `Rs12,000` (Admission Fee)
- `Rs10,000` (Annual Charges)

**Recommended Change:**
```typescript
// Current
{ class: 'Playgroup (PG)', monthly: 'Rs4,500', admission: 'Rs12,000', annual: 'Rs10,000' }

// Recommended
{ class: 'Playgroup (PG)', monthly: 'PKR 4,500', admission: 'PKR 12,000', annual: 'PKR 10,000' }

// Also update description
"All fees are in Pakistani Rupees (PKR)"
```

**Impact:** High - 45+ fee entries need updating

---

### **Job Application Form**

#### 6. `components/jobs/JobApplicationForm.tsx`
**Current Format:** `PKR` ✅
**Locations:**
- Line 599: Label `"Expected Salary Package (PKR)"`
- Line 604: Display `"PKR"`
- Line 623: Helper text `"Enter expected salary in Pakistani Rupees (PKR)"`

**Status:** ✅ Already using PKR correctly

---

## Summary of Currency Formats

| Format | Usage Count | Files | Status |
|--------|------------|-------|--------|
| **₨** | ~10+ | Scholarships components | ⚠️ Needs change |
| **PKR** | ~5+ | Registration, Jobs | ✅ Correct |
| **Rs** | ~50+ | Fee Structure | ⚠️ Needs change |
| **Rs:** | 1 | Registration test rules | ⚠️ Needs change |

---

## Recommended Standard Format

### **Primary Format: `PKR {amount}`**

**Examples:**
- `PKR 1,043,500`
- `PKR 32,000 - 83,000`
- `PKR 500/-`
- `PKR 15.0 Lacs`

### **Formatting Rules:**

1. **Basic Amount:**
   - `PKR {number}` (with comma separators for thousands)
   - Example: `PKR 1,043,500`

2. **Range:**
   - `PKR {min} - {max}`
   - Example: `PKR 32,000 - 83,000`

3. **With Suffix:**
   - `PKR {amount}/-` (for fees)
   - Example: `PKR 500/-`

4. **Large Amounts (Lacs):**
   - `PKR {amount} Lacs`
   - Example: `PKR 15.0 Lacs`

5. **Variable Amounts:**
   - `PKR Variable` or `Variable (PKR)`
   - Example: `Variable` (for Pakians Scholarship)

---

## Implementation Plan

### **Phase 1: Scholarships Section** (High Priority)
**Files:**
1. `components/scholarships/ScholarshipStats.tsx`
2. `components/scholarships/ScholarshipDataTables.tsx`
3. `lib/scholarship-data.ts`

**Changes:**
- Replace `₨` with `PKR ` (with space)
- Update formatAmount function
- Update all string literals

**Estimated Impact:** 10+ instances

---

### **Phase 2: Registration Form** (Medium Priority)
**Files:**
1. `components/registration-form/StudentRegistrationForm.tsx`

**Changes:**
- Update `formatRegistrationFeeRs()` to use `PKR` instead of `Rs:`

**Estimated Impact:** 1 function, affects test rules display

---

### **Phase 3: Fee Structure** (High Priority)
**Files:**
1. `components/admission/FeeStructure.tsx`

**Changes:**
- Update all 45+ fee entries from `Rs` to `PKR ` (with space)
- Update description text

**Estimated Impact:** 45+ instances

---

## Code Examples

### **Example 1: ScholarshipStats.tsx**

**Current:**
```typescript
const formatAmount = (amount: number) => {
  if (amount >= 100000) {
    return `₨${(amount / 100000).toFixed(1)} Lacs`
  }
  return `₨${amount.toLocaleString()}`
}
```

**Recommended:**
```typescript
const formatAmount = (amount: number) => {
  if (amount >= 100000) {
    return `PKR ${(amount / 100000).toFixed(1)} Lacs`
  }
  return `PKR ${amount.toLocaleString()}`
}
```

---

### **Example 2: ScholarshipDataTables.tsx**

**Current:**
```typescript
<p className="text-lg sm:text-xl lg:text-2xl font-bold text-accent-600 truncate">
  ₨{totalAmount.toLocaleString()}
</p>
```

**Recommended:**
```typescript
<p className="text-lg sm:text-xl lg:text-2xl font-bold text-accent-600 truncate">
  PKR {totalAmount.toLocaleString()}
</p>
```

---

### **Example 3: scholarship-data.ts**

**Current:**
```typescript
{
  type: "Merit Based Scholarship",
  amount: "₨32,000 - ₨83,000",
  // ...
}
```

**Recommended:**
```typescript
{
  type: "Merit Based Scholarship",
  amount: "PKR 32,000 - 83,000",
  // ...
}
```

---

### **Example 4: FeeStructure.tsx**

**Current:**
```typescript
{ class: 'Playgroup (PG)', monthly: 'Rs4,500', admission: 'Rs12,000', annual: 'Rs10,000' }
```

**Recommended:**
```typescript
{ class: 'Playgroup (PG)', monthly: 'PKR 4,500', admission: 'PKR 12,000', annual: 'PKR 10,000' }
```

---

## Benefits of Standardization

### **1. Consistency**
- ✅ Single currency format across entire site
- ✅ Professional appearance
- ✅ Better user experience

### **2. International Recognition**
- ✅ PKR is the ISO currency code
- ✅ More recognizable internationally
- ✅ Standard in financial contexts

### **3. Accessibility**
- ✅ Screen readers handle "PKR" better than symbols
- ✅ Better for international users
- ✅ Clearer for all users

### **4. Maintainability**
- ✅ Easier to update if format changes
- ✅ Consistent codebase
- ✅ Less confusion for developers

---

## Potential Issues & Considerations

### **1. Symbol vs Text**
- **Current:** Mix of symbol (₨) and text (PKR, Rs)
- **Recommendation:** Use text (PKR) for consistency and accessibility

### **2. Spacing**
- **Current:** Inconsistent spacing (`Rs4,500` vs `PKR 500`)
- **Recommendation:** Always use space: `PKR {amount}`

### **3. Range Formatting**
- **Current:** `₨32,000 - ₨83,000` (repetitive)
- **Recommendation:** `PKR 32,000 - 83,000` (cleaner)

### **4. Large Numbers**
- **Current:** `₨15.0 Lacs`
- **Recommendation:** `PKR 15.0 Lacs` (consistent)

---

## Testing Checklist

After implementation, verify:

- [ ] Scholarships page displays `PKR` format
- [ ] Total Amount shows `PKR 1,043,500` (not `₨1,043,500`)
- [ ] Scholarship types show `PKR` in ranges
- [ ] Registration form uses `PKR` in test rules
- [ ] Fee structure table shows `PKR` for all fees
- [ ] Job application form still shows `PKR` correctly
- [ ] All currency displays are consistent
- [ ] No mixed formats appear anywhere
- [ ] Mobile view displays correctly
- [ ] Screen readers announce "PKR" correctly

---

## Files Summary

### **Files Requiring Changes:**

1. ✅ `components/scholarships/ScholarshipStats.tsx` (2 instances)
2. ✅ `components/scholarships/ScholarshipDataTables.tsx` (3 instances)
3. ✅ `lib/scholarship-data.ts` (4 instances)
4. ✅ `components/registration-form/StudentRegistrationForm.tsx` (1 instance)
5. ✅ `components/admission/FeeStructure.tsx` (45+ instances)

**Total Files:** 5  
**Total Instances:** ~55+

---

## Estimated Effort

- **Time:** 1-2 hours
- **Complexity:** Low-Medium (mostly find-and-replace)
- **Risk:** Low (cosmetic changes, no logic changes)
- **Testing:** 30 minutes

---

## Next Steps

1. ✅ **Review this analysis**
2. ⏳ **Approve standardization to PKR**
3. ⏳ **Implement changes** (when approved)
4. ⏳ **Test all currency displays**
5. ⏳ **Verify consistency across site**

---

## Conclusion

**Current State:** Multiple currency formats (₨, PKR, Rs, Rs:) used inconsistently  
**Target State:** Single format (PKR) used throughout  
**Impact:** High visibility, affects user experience  
**Effort:** Low-Medium (mostly string replacements)

**Recommendation:** ✅ **Proceed with standardization to PKR format**

