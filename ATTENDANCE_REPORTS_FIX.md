# Quick Fix for AdvancedAttendanceReportsPage.tsx

## Error Location
- **File**: `src/pages/AdvancedAttendanceReportsPage.tsx`
- **Line**: 674, Column 90
- **Context**: Inside a `.map()` function starting at line 667

## Fix Required

### Issue 1: `toFixed()` called on undefined value

**Find line 674** and look for a pattern like:
```tsx
{item.someProperty.toFixed(2)}
// OR
{((item.value1 / item.value2) * 100).toFixed(2)}
```

**Replace with:**
```tsx
{(item.someProperty ?? 0).toFixed(2)}
// OR for percentage calculations:
{((item.value1 ?? 0) / ((item.value2 ?? 1) || 1) * 100).toFixed(2)}
```

### Issue 2: Typography + Chip nesting (DOM warning)

**Find any occurrence of:**
```tsx
<Typography>
  <Chip label="..." />
</Typography>
```

**Replace with:**
```tsx
<Typography component="div">
  <Chip label="..." />
</Typography>
```

## Common Patterns to Fix

### Pattern 1: Simple value
```tsx
// BEFORE (line 674):
{item.attendancePercentage.toFixed(2)}

// AFTER:
{(item.attendancePercentage ?? 0).toFixed(2)}
```

### Pattern 2: Percentage calculation
```tsx
// BEFORE:
{((item.present / item.total) * 100).toFixed(2)}

// AFTER:
{((item.present ?? 0) / ((item.total ?? 1) || 1) * 100).toFixed(2)}
```

### Pattern 3: Nested property
```tsx
// BEFORE:
{item.stats.percentage.toFixed(2)}

// AFTER:
{((item.stats?.percentage ?? 0)).toFixed(2)}
```

## Quick Find & Replace

If you can open the file, search for:
1. `.toFixed(` around line 674
2. `<Typography>` followed by `<Chip` 

Then apply the fixes above.
