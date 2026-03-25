# Bulk Edit Module – Porting Guide

Use this guide to add the same bulk-edit-in-table experience to another project or another entity (e.g. Products, Employees, Contacts) in this project.

---

## Quick copy list (this repo)

```
components/students/BulkEditToolbar.tsx    → copy as-is
components/students/BulkEditPreview.tsx    → copy as-is
components/students/EditableCell.tsx       → copy; adjust @/lib/utils if no phone mask
app/api/students/bulk-update/route.ts     → copy; change backend path + getApiBaseUrl
```

Table logic is inside `components/students/StudentsTable.tsx` (state + handlers + wiring). Use Section 4 to reimplement that in your table; do not copy the whole file unless your table is also a students table.

---

## 1. Files to Copy

Copy these files into your other project (keep folder structure or adapt paths).

| Source (this project) | Purpose |
|-----------------------|--------|
| `components/students/BulkEditToolbar.tsx` | Toolbar: toggle mode, column select, Save/Cancel, Fill Down, Set All, Undo/Redo. **Reusable as-is.** |
| `components/students/BulkEditPreview.tsx` | Modal: review changes (old → new) by row, then confirm save. **Reusable as-is.** |
| `components/students/EditableCell.tsx` | Single editable cell (text, tel, date, select) with validation and keyboard nav. **Reusable; only imports `@/lib/utils` for phone mask.** |
| `app/api/students/bulk-update/route.ts` | Next.js API route that proxies to your backend. **Adapt URL and request/response.** |

**Table integration** lives inside `components/students/StudentsTable.tsx`. You don’t copy the whole file; you copy the **bulk-edit state and logic** into your own table (see Section 4).

---

## 2. Dependencies Your Project Must Have

- **React 18+** with hooks.
- **Next.js** (if you use the API route; otherwise replace with direct backend calls).
- **lucide-react** (icons used in toolbar and preview).
- **API client** that sends auth (e.g. `Authorization` header). The bulk-update route and `bulkUpdateStudents` assume a similar client.
- **Config for API base URL**  
  This project uses `getApiBaseUrl()` from `@/lib/config`. Your project needs an equivalent (e.g. `process.env.NEXT_PUBLIC_API_URL` or a `getApiBaseUrl()` in `lib/config.ts`).

Optional:

- **Phone formatting**  
  `EditableCell` uses `maskPakistanPhoneNumber` from `@/lib/utils`. You can replace with your own formatter or remove for non-phone fields.
- **Validation helpers**  
  Students use `validatePakistanPhoneNumber` from `@/lib/utils` in `fieldConfigs`. Replace with your own validators.

---

## 3. Backend API Contract

Your backend must expose a **bulk update** endpoint that:

- **Method:** POST  
- **URL:** e.g. `/api/students/bulk-update` (or `/api/products/bulk-update`, etc.)  
- **Body:**  
  `{ "updates": [ { "id": number, "<field1>": value, ... }, ... ] }`  
  Each item is the row `id` plus only the fields that changed.
- **Response:**  
  `{ "success": number, "failed": number, "errors"?: [ { "studentId": number, "field": string, "error": string } ] }`  
  (Rename `studentId` to your entity id if you prefer.)

The frontend sends only **changed** fields per row; the backend should merge them onto the existing record.

---

## 4. Integrating Bulk Edit Into Your Table

In your **table component** (e.g. `ProductsTable.tsx` or `EmployeesTable.tsx`), add the same patterns as in `StudentsTable.tsx`.

### 4.1 State

```ts
const [isBulkEditMode, setIsBulkEditMode] = useState(false)
const [selectedColumn, setSelectedColumn] = useState<string | null>(null)
const [editedValues, setEditedValues] = useState<Record<number, Partial<YourEntity>>>({})
const [validationErrors, setValidationErrors] = useState<Record<number, Record<string, string>>>({})
const [originalValues, setOriginalValues] = useState<Record<number, Partial<YourEntity>>>({})
const [currentFocusedCell, setCurrentFocusedCell] = useState<{ entityId: number; field: string } | null>(null)
const [showPreview, setShowPreview] = useState(false)
const [saving, setSaving] = useState(false)
const [history, setHistory] = useState<Record<number, Partial<YourEntity>>[]>([])
const [historyIndex, setHistoryIndex] = useState(-1)
```

Replace `YourEntity` with your type (e.g. `Product`, `Employee`).

### 4.2 Field configuration

Define a `fieldConfigs` object: one entry per editable field, with:

- `type`: `'text' | 'date' | 'select' | 'tel'`
- `label`: display name
- `required`: boolean (optional)
- `validation`: `(value) => string | null` (error message or null)
- `options`: for `type === 'select'`, `Array<{ value, label }>`
- `format`: optional, e.g. phone formatter

And an `editableColumns` array: `[ { value: 'fieldKey', label: 'Label' }, ... ]` for the toolbar dropdown.

### 4.3 Handlers

- **handleCellEdit(entityId, field, value, skipHistory?)**  
  Updates `editedValues`, runs validation (and updates `validationErrors`), and optionally pushes to `history` for undo/redo.
- **Fill Down**  
  Take the first row’s value for `selectedColumn` and apply it to all rows (using `handleCellEdit` and `saveToHistory`).
- **Set All**  
  Prompt for one value and apply to all rows for `selectedColumn`.
- **Undo / Redo**  
  Use `history` and `historyIndex` to restore a previous `editedValues` snapshot.
- **handleBulkSave**  
  If no validation errors, set `showPreview(true)`.
- **handleConfirmSave**  
  Build `updates` from `editedValues` (only changed fields + `id`), call your `bulkUpdateXxx(updates)`, then refresh list and reset bulk-edit state (and clear draft).
- **handleBulkCancel**  
  Confirm and reset all bulk-edit state and clear draft.
- **toggleBulkEditMode**  
  If there are unsaved changes, confirm before turning off; then flip `isBulkEditMode` and clear or restore draft.

### 4.4 Draft persistence

- When `isBulkEditMode` and `editedValues` is non-empty, save to `localStorage` (e.g. key `bulkEditDraft`) an object like:  
  `{ editedValues, selectedColumn, timestamp }`.
- When entering bulk edit mode, read that key; if draft exists and is recent (e.g. &lt; 1 hour), restore `editedValues` and `selectedColumn`.

### 4.5 Building the updates payload for the API

From `editedValues` (keyed by entity `id`), build:

```ts
const updates = Object.entries(editedValues).map(([id, changes]) => ({
  id: parseInt(id, 10),
  ...changes,
}))
```

Normalize dates (e.g. to ISO string) if your API expects that. Then call your bulk-update API (e.g. `bulkUpdateStudents(updates)` or `bulkUpdateProducts(updates)`).

### 4.6 UI wiring

- Render **BulkEditToolbar** with:  
  `isActive`, `selectedColumn`, `editedCount={Object.keys(editedValues).length}`, `totalStudents` (or your row count), `onToggleMode`, `onColumnSelect`, `onSave`, `onCancel`, `saving`, `editableColumns`, `hasValidationErrors`, `onFillDown`, `onSetAll`, `onUndo`, `onRedo`, `canUndo`, `canRedo`, `onShowKeyboardHelp`.
- Render **BulkEditPreview** when `showPreview` is true, with:  
  `changes` (list of { entityId, entityName, field, fieldLabel, oldValue, newValue }), `onConfirm`, `onCancel`, `saving`, `errors={validationErrors}`.
- For each **editable column**, render either:
  - A normal cell when not in bulk edit or column not selected, or
  - **EditableCell** when `isBulkEditMode && selectedColumn === fieldKey`, passing:  
    `entityId`, `field`, `value`, `originalValue`, `isEditing={currentFocusedCell?.entityId === row.id && currentFocusedCell?.field === fieldKey}`, `fieldConfig`, `onChange`, `onBlur`, `error`, `isEdited`.

Optional: **Keyboard shortcuts** (e.g. Ctrl+Enter = save, Ctrl+Z = undo, Ctrl+Y = redo) and **moveToNextCell** (Enter / Tab / Arrow keys) by dispatching a custom event that your table listens for and then setting `currentFocusedCell` and focusing the next input.

---

## 5. API Route in the Other Project

If the other project is Next.js, add a route (e.g. `app/api/students/bulk-update/route.ts` or `app/api/products/bulk-update/route.ts`):

- Read body: `{ updates: Array<{ id: number, ...fields }> }`.
- Forward to backend:  
  `POST ${getApiBaseUrl()}/api/your-entity/bulk-update`  
  with the same body and auth header (e.g. `request.headers.get('authorization')`).
- Return JSON: `{ success, failed, errors? }` and appropriate status code.

If the other project is not Next.js, skip this file and call your backend bulk-update URL directly from the client (using your existing API client and auth).

---

## 6. Client API Function

In your API layer (e.g. `lib/api/students.ts` or `lib/api/products.ts`), add:

```ts
export async function bulkUpdateXxx(
  updates: Array<{ id: number } & Partial<YourEntity>>
): Promise<{ success: number; failed: number; errors?: Array<{ studentId: number; field: string; error: string }> }> {
  const res = await api.post('/api/your-entity/bulk-update', { updates })
  return res
}
```

Use your real entity name and path. Ensure date/time fields are sent in the format your backend expects (e.g. ISO string).

---

## 7. Checklist for the Other Project

- [ ] Copy `BulkEditToolbar.tsx`, `BulkEditPreview.tsx`, `EditableCell.tsx`.
- [ ] Add or adapt API route `app/api/<entity>/bulk-update/route.ts` and ensure backend URL/auth.
- [ ] Add `bulkUpdateXxx` and types (request/response) in your API client.
- [ ] In your table: add state (4.1), field configs + editable columns (4.2), handlers (4.3), draft save/restore (4.4), and build `updates` (4.5).
- [ ] In your table: render BulkEditToolbar, BulkEditPreview, and EditableCell per column (4.6).
- [ ] Replace `maskPakistanPhoneNumber` / `validatePakistanPhoneNumber` in `EditableCell` or `fieldConfigs` if you don’t have them (or add minimal helpers).
- [ ] Ensure backend implements POST bulk-update and returns `success`, `failed`, `errors`.

After that, the same bulk-edit UX (column select, in-cell edit, fill down, set all, undo/redo, preview, save) will work for your other entity in the other project.
