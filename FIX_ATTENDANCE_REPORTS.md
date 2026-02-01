# Fixes for AdvancedAttendanceReportsPage.tsx

## Issues Identified:

1. **Line 674**: `Cannot read properties of undefined (reading 'toFixed')`
   - A value is undefined when calling `.toFixed()`
   - Need to add null/undefined checks

2. **DOM Nesting Warning**: `<div> cannot appear as a descendant of <p>`
   - Chip component is inside Typography component (which renders as `<p>` by default)
   - Need to change Typography's `component` prop or restructure

## Fixes:

### Fix 1: Add null/undefined check before toFixed()

**Before (line 674):**
```tsx
{someValue.toFixed(2)}
```

**After:**
```tsx
{(someValue ?? 0).toFixed(2)}
// OR
{someValue?.toFixed(2) ?? '0.00'}
```

### Fix 2: Fix Typography + Chip nesting

**Before:**
```tsx
<Typography>
  <Chip label="..." />
</Typography>
```

**After (Option 1 - Change Typography component):**
```tsx
<Typography component="div">
  <Chip label="..." />
</Typography>
```

**After (Option 2 - Use Box instead):**
```tsx
<Box>
  <Chip label="..." />
</Box>
```

**After (Option 3 - Use Typography with span):**
```tsx
<Typography component="span">
  <Chip label="..." />
</Typography>
```

## Common Pattern for Attendance Percentage:

If line 674 is calculating attendance percentage:
```tsx
// Before (causes error if attendance or total is undefined)
{((attendance / total) * 100).toFixed(2)}%

// After (safe version)
{attendance && total ? ((attendance / total) * 100).toFixed(2) : '0.00'}%
// OR
{((attendance ?? 0) / (total ?? 1) * 100).toFixed(2)}%
```
