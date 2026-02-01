# ⚡ Bulk Student Edit - Quick Reference Guide

**Quick implementation reference for developers**

---

## 🎯 Core Concept

Enable column-by-column bulk editing of student records, similar to Excel editing.

---

## 📐 Component Structure

```
StudentsTable
├── BulkEditToolbar (new)
│   ├── Mode Toggle Button
│   ├── Column Selector Dropdown
│   ├── Save Button (with count badge)
│   └── Cancel Button
│
├── Table Rows (modified)
│   └── EditableCell (new) - replaces static cells
│       ├── Input/Select/Date based on field type
│       ├── Validation indicator
│       └── Edit indicator
│
└── BulkEditPreview Modal (new)
    ├── Changes table
    ├── Confirm button
    └── Cancel button
```

---

## 🔧 Key Code Patterns

### **1. State Management**

```typescript
// Add to StudentsTable component
const [isBulkEditMode, setIsBulkEditMode] = useState(false)
const [selectedColumn, setSelectedColumn] = useState<string | null>(null)
const [editedValues, setEditedValues] = useState<Record<number, Partial<Student>>>({})
const [originalValues, setOriginalValues] = useState<Record<number, Student>>({})
const [validationErrors, setValidationErrors] = useState<Record<number, Record<string, string>>>({})
```

### **2. Toggle Bulk Edit Mode**

```typescript
const toggleBulkEditMode = useCallback(() => {
  if (isBulkEditMode && hasUnsavedChanges) {
    if (!confirm('You have unsaved changes. Exit bulk edit mode?')) {
      return
    }
  }
  
  setIsBulkEditMode(prev => !prev)
  setSelectedColumn(null)
  setEditedValues({})
  setValidationErrors({})
}, [isBulkEditMode, hasUnsavedChanges])
```

### **3. Handle Cell Edit**

```typescript
const handleCellEdit = useCallback((
  studentId: number,
  field: string,
  value: string | number
) => {
  // Update edited values
  setEditedValues(prev => ({
    ...prev,
    [studentId]: {
      ...prev[studentId],
      [field]: value
    }
  }))
  
  // Validate field
  const fieldConfig = EDITABLE_FIELDS[field]
  if (fieldConfig?.validation) {
    const error = fieldConfig.validation(value)
    if (error) {
      setValidationErrors(prev => ({
        ...prev,
        [studentId]: {
          ...prev[studentId],
          [field]: error
        }
      }))
    } else {
      // Clear error
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        if (newErrors[studentId]) {
          delete newErrors[studentId][field]
          if (Object.keys(newErrors[studentId]).length === 0) {
            delete newErrors[studentId]
          }
        }
        return newErrors
      })
    }
  }
}, [])
```

### **4. Save Changes**

```typescript
const handleBulkSave = useCallback(async () => {
  // Check for validation errors
  const hasErrors = Object.keys(validationErrors).length > 0
  if (hasErrors) {
    alert('Please fix validation errors before saving')
    return
  }
  
  // Prepare updates
  const updates = Object.entries(editedValues).map(([studentId, changes]) => ({
    id: parseInt(studentId),
    ...changes
  }))
  
  try {
    setSaving(true)
    const response = await bulkUpdateStudents(updates)
    
    if (response.failed > 0) {
      // Show errors
      console.error('Some updates failed:', response.errors)
    }
    
    // Refresh table
    await loadStudents()
    
    // Reset state
    setIsBulkEditMode(false)
    setSelectedColumn(null)
    setEditedValues({})
    setValidationErrors({})
    
    toast.success(`Updated ${response.success} students successfully`)
  } catch (error) {
    toast.error('Failed to save changes')
  } finally {
    setSaving(false)
  }
}, [editedValues, validationErrors, loadStudents])
```

### **5. Render Editable Cell**

```typescript
// In table row
{isBulkEditMode && selectedColumn === 'name' ? (
  <EditableCell
    studentId={student.id}
    field="name"
    value={editedValues[student.id]?.name ?? student.name}
    isEditing={true}
    fieldConfig={EDITABLE_FIELDS.name}
    onChange={handleCellEdit}
    onBlur={() => {}}
    error={validationErrors[student.id]?.name}
    isEdited={!!editedValues[student.id]?.name}
  />
) : (
  <td>{student.name}</td>
)}
```

---

## 🎨 UI Component Examples

### **BulkEditToolbar**

```tsx
{isBulkEditMode && (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-3">
        <span className="text-blue-700 font-semibold">🔵 Bulk Edit Mode</span>
        <select
          value={selectedColumn || ''}
          onChange={(e) => setSelectedColumn(e.target.value || null)}
          className="px-4 py-2 border border-blue-300 rounded-lg"
        >
          <option value="">Select column...</option>
          <option value="name">Student Name</option>
          <option value="fatherName">Father Name</option>
          <option value="dateOfBirth">Date of Birth</option>
          <option value="status">Status</option>
        </select>
      </div>
      
      <div className="flex items-center gap-2">
        {Object.keys(editedValues).length > 0 && (
          <span className="text-sm text-gray-600">
            {Object.keys(editedValues).length} unsaved changes
          </span>
        )}
        <button
          onClick={handleBulkSave}
          disabled={Object.keys(editedValues).length === 0 || saving}
          className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
        >
          {saving ? 'Saving...' : `Save ${Object.keys(editedValues).length} Changes`}
        </button>
        <button
          onClick={handleBulkCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
```

### **EditableCell Component**

```tsx
const EditableCell = ({
  studentId,
  field,
  value,
  isEditing,
  fieldConfig,
  onChange,
  onBlur,
  error,
  isEdited
}: EditableCellProps) => {
  if (!isEditing) {
    return (
      <span className={isEdited ? 'bg-yellow-50 px-1 rounded' : ''}>
        {value}
      </span>
    )
  }
  
  const inputValue = value ?? ''
  
  if (fieldConfig.type === 'text') {
    return (
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onChange(studentId, field, e.target.value)}
          onBlur={() => onBlur(studentId, field)}
          className={`w-full px-2 py-1 border rounded ${
            error ? 'border-red-500 bg-red-50' :
            isEdited ? 'border-blue-500 bg-yellow-50' :
            'border-blue-300'
          }`}
        />
        {error && (
          <div className="absolute top-full left-0 mt-1 text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1 z-10 whitespace-nowrap">
            {error}
          </div>
        )}
      </div>
    )
  }
  
  if (fieldConfig.type === 'select') {
    return (
      <select
        value={inputValue}
        onChange={(e) => onChange(studentId, field, e.target.value)}
        className={`w-full px-2 py-1 border rounded ${
          error ? 'border-red-500 bg-red-50' :
          isEdited ? 'border-blue-500 bg-yellow-50' :
          'border-blue-300'
        }`}
      >
        {fieldConfig.options?.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    )
  }
  
  if (fieldConfig.type === 'date') {
    return (
      <input
        type="date"
        value={inputValue}
        onChange={(e) => onChange(studentId, field, e.target.value)}
        max={new Date().toISOString().split('T')[0]}
        className={`w-full px-2 py-1 border rounded ${
          error ? 'border-red-500 bg-red-50' :
          isEdited ? 'border-blue-500 bg-yellow-50' :
          'border-blue-300'
        }`}
      />
    )
  }
  
  return <span>{value}</span>
}
```

---

## 🔌 API Integration

### **Backend Endpoint**

```typescript
// POST /api/students/bulk-update
// Headers: Authorization: Bearer <token>
// Body:
{
  "updates": [
    {
      "id": 1,
      "name": "John Doe",
      "fatherName": "John Senior"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "status": "Active"
    }
  ]
}

// Response:
{
  "success": 2,
  "failed": 0,
  "errors": []
}
```

### **Frontend API Function**

```typescript
// lib/api/students.ts
export async function bulkUpdateStudents(
  updates: Array<{ id: number } & Partial<UpdateStudentRequest>>
): Promise<BulkUpdateStudentsResponse> {
  try {
    return await api.post<BulkUpdateStudentsResponse>(
      '/api/students/bulk-update',
      { updates }
    )
  } catch (error) {
    const apiError = error as ApiError
    throw new Error(
      apiError.message || 'Unable to update students. Please try again.'
    )
  }
}
```

---

## ✅ Implementation Checklist

### **Backend**
- [ ] Create `/api/students/bulk-update` endpoint
- [ ] Add validation for all fields
- [ ] Add permission check (Admin only)
- [ ] Add audit logging
- [ ] Handle errors gracefully
- [ ] Return detailed error response

### **Frontend - Core**
- [ ] Add bulk edit state to StudentsTable
- [ ] Create BulkEditToolbar component
- [ ] Create EditableCell component
- [ ] Add mode toggle button
- [ ] Add column selector
- [ ] Implement cell editing
- [ ] Add save/cancel handlers

### **Frontend - Validation**
- [ ] Add field validation rules
- [ ] Show validation errors
- [ ] Prevent invalid saves
- [ ] Clear errors on edit

### **Frontend - UX**
- [ ] Visual indicators (edited cells)
- [ ] Change preview modal
- [ ] Loading states
- [ ] Success/error messages
- [ ] Undo functionality (optional)

### **Mobile**
- [ ] Column editor modal
- [ ] Responsive design
- [ ] Touch-friendly controls

### **Testing**
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance testing

---

## 🎯 Quick Start Implementation

### **Step 1: Add State**
```typescript
// In StudentsTable.tsx
const [isBulkEditMode, setIsBulkEditMode] = useState(false)
const [selectedColumn, setSelectedColumn] = useState<string | null>(null)
const [editedValues, setEditedValues] = useState<Record<number, Partial<Student>>>({})
```

### **Step 2: Add Toggle Button**
```tsx
<button onClick={() => setIsBulkEditMode(true)}>
  Bulk Edit Mode
</button>
```

### **Step 3: Add Toolbar**
```tsx
{isBulkEditMode && <BulkEditToolbar ... />}
```

### **Step 4: Make Cells Editable**
```tsx
{isBulkEditMode && selectedColumn === 'name' ? (
  <EditableCell ... />
) : (
  <td>{student.name}</td>
)}
```

### **Step 5: Add Save Handler**
```typescript
const handleSave = async () => {
  const updates = Object.entries(editedValues).map(([id, changes]) => ({
    id: parseInt(id),
    ...changes
  }))
  await bulkUpdateStudents(updates)
  await loadStudents()
}
```

---

## 📚 Related Files

- `components/students/StudentsTable.tsx` - Main table component
- `components/students/StudentForm.tsx` - Individual edit form
- `lib/api/students.ts` - API functions
- `components/news/NewsTable.tsx` - Reference for bulk operations pattern

---

**Quick Reference Version:** 1.0  
**Last Updated:** January 2025
