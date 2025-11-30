# 📋 News & Events Admin Dashboard - Design Document

## 🎯 Overview

This document outlines the complete design for an admin dashboard to manage News and Events in the database. The system will allow **Admin** and **Supporting Staff** users to add, update, and delete news items and events through a user-friendly interface.

---

## 📊 Database Schema Design

### 1. News Table (`News`)

```sql
CREATE TABLE News (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(500) NOT NULL,
    Slug NVARCHAR(500) NOT NULL UNIQUE,
    Description NVARCHAR(MAX),
    Content NVARCHAR(MAX), -- Full article content (optional)
    Category NVARCHAR(100), -- e.g., "Admissions", "Exams", "Events", "Achievements", "General"
    ImageUrl NVARCHAR(1000), -- Featured image URL
    Date DATETIME2 NOT NULL, -- Publication date
    IsPublished BIT NOT NULL DEFAULT 1, -- Show/hide on frontend
    IsFeatured BIT NOT NULL DEFAULT 0, -- Featured news
    IsInMarquee BIT NOT NULL DEFAULT 0, -- Show in top marquee
    DisplayOrder INT DEFAULT 0, -- For sorting
    ViewCount INT DEFAULT 0, -- Track views
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2,
    CreatedByUserId NVARCHAR(450), -- Foreign key to Users
    UpdatedByUserId NVARCHAR(450), -- Foreign key to Users
    CONSTRAINT FK_News_CreatedBy FOREIGN KEY (CreatedByUserId) REFERENCES AspNetUsers(Id),
    CONSTRAINT FK_News_UpdatedBy FOREIGN KEY (UpdatedByUserId) REFERENCES AspNetUsers(Id)
);

CREATE INDEX IX_News_Category ON News(Category);
CREATE INDEX IX_News_Date ON News(Date DESC);
CREATE INDEX IX_News_IsPublished ON News(IsPublished);
CREATE INDEX IX_News_Slug ON News(Slug);
```

**Fields Explanation:**
- `Title`: News headline (required)
- `Slug`: URL-friendly identifier (auto-generated from title, unique)
- `Description`: Short summary for listings (required)
- `Content`: Full article content (optional, for detailed news pages)
- `Category`: News category for filtering
- `ImageUrl`: Featured image path
- `Date`: Publication date (defaults to current date)
- `IsPublished`: Toggle visibility on frontend
- `IsFeatured`: Mark as featured news
- `IsInMarquee`: Show in top scrolling marquee
- `DisplayOrder`: Manual sorting order
- `ViewCount`: Analytics tracking
- `CreatedByUserId` / `UpdatedByUserId`: Audit trail

### 2. Events Table (`Events`)

```sql
CREATE TABLE Events (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(500) NOT NULL,
    Description NVARCHAR(MAX),
    Date DATE NOT NULL, -- Event date
    Time TIME, -- Event time (optional)
    EndDate DATE, -- For multi-day events (optional)
    EndTime TIME, -- End time (optional)
    Location NVARCHAR(500), -- Venue/location
    Category NVARCHAR(100), -- e.g., "Academic", "Sports", "Cultural", "Religious", "General"
    ImageUrl NVARCHAR(1000), -- Event image
    IsPublished BIT NOT NULL DEFAULT 1,
    IsFeatured BIT NOT NULL DEFAULT 0,
    DisplayOrder INT DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2,
    CreatedByUserId NVARCHAR(450),
    UpdatedByUserId NVARCHAR(450),
    CONSTRAINT FK_Events_CreatedBy FOREIGN KEY (CreatedByUserId) REFERENCES AspNetUsers(Id),
    CONSTRAINT FK_Events_UpdatedBy FOREIGN KEY (UpdatedByUserId) REFERENCES AspNetUsers(Id)
);

CREATE INDEX IX_Events_Date ON Events(Date DESC);
CREATE INDEX IX_Events_Category ON Events(Category);
CREATE INDEX IX_Events_IsPublished ON Events(IsPublished);
```

**Fields Explanation:**
- `Title`: Event name (required)
- `Description`: Event details
- `Date`: Event date (required)
- `Time`: Event start time (optional, e.g., "08:30 AM")
- `EndDate`: For multi-day events
- `EndTime`: Event end time
- `Location`: Venue/address
- `Category`: Event category
- `ImageUrl`: Event image
- `IsPublished`: Toggle visibility
- `IsFeatured`: Mark as featured
- `DisplayOrder`: Manual sorting

### 3. News Categories (Optional - Can be enum or table)

**Option A: Enum in Code** (Simpler)
```csharp
public enum NewsCategory
{
    General,
    Admissions,
    Exams,
    Events,
    Achievements,
    Announcements,
    Sports,
    Academic
}
```

**Option B: Database Table** (More flexible)
```sql
CREATE TABLE NewsCategories (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL UNIQUE,
    DisplayOrder INT DEFAULT 0,
    IsActive BIT DEFAULT 1
);
```

---

## 🔌 Backend API Endpoints Design

### News API (`/api/news`)

#### GET Endpoints

1. **Get All News** (Paginated)
   ```
   GET /api/news?page=1&pageSize=10&category=Admissions&isPublished=true&search=keyword
   ```
   Response:
   ```json
   {
     "data": [
       {
         "id": 1,
         "title": "Admission Open for 2025-26",
         "slug": "admission-open-2025-26",
         "description": "Admissions are now open...",
         "category": "Admissions",
         "imageUrl": "/uploads/news/image.jpg",
         "date": "2024-12-01T00:00:00Z",
         "isPublished": true,
         "isFeatured": true,
         "isInMarquee": false,
         "displayOrder": 1,
         "viewCount": 150,
         "createdAt": "2024-11-01T10:00:00Z",
         "updatedAt": "2024-11-15T12:00:00Z",
         "createdBy": {
           "id": "user-id",
           "firstName": "Admin",
           "lastName": "User"
         }
       }
     ],
     "totalCount": 50,
     "totalPages": 5,
     "currentPage": 1,
     "pageSize": 10
   }
   ```

2. **Get News by ID**
   ```
   GET /api/news/{id}
   ```

3. **Get News by Slug**
   ```
   GET /api/news/slug/{slug}
   ```

4. **Get Featured News**
   ```
   GET /api/news/featured?limit=5
   ```

5. **Get Marquee News**
   ```
   GET /api/news/marquee?limit=10
   ```

#### POST Endpoint

6. **Create News**
   ```
   POST /api/news
   ```
   Request Body:
   ```json
   {
     "title": "New Admission Announcement",
     "description": "Admissions are now open...",
     "content": "Full article content here...",
     "category": "Admissions",
     "imageUrl": "/uploads/news/image.jpg",
     "date": "2024-12-01T00:00:00Z",
     "isPublished": true,
     "isFeatured": false,
     "isInMarquee": true,
     "displayOrder": 0
   }
   ```

#### PUT Endpoint

7. **Update News**
   ```
   PUT /api/news/{id}
   ```
   Request Body: Same as Create (all fields optional except id)

#### DELETE Endpoint

8. **Delete News**
   ```
   DELETE /api/news/{id}
   ```

### Events API (`/api/events`)

#### GET Endpoints

1. **Get All Events** (Paginated)
   ```
   GET /api/events?page=1&pageSize=10&category=Academic&isPublished=true&upcoming=true
   ```
   Response:
   ```json
   {
     "data": [
       {
         "id": 1,
         "title": "Annual Prize Distribution",
         "description": "Celebrating excellence...",
         "date": "2024-12-15",
         "time": "10:00:00",
         "endDate": null,
         "endTime": null,
         "location": "Main Auditorium",
         "category": "Academic",
         "imageUrl": "/uploads/events/image.jpg",
         "isPublished": true,
         "isFeatured": true,
         "displayOrder": 1,
         "createdAt": "2024-11-01T10:00:00Z",
         "updatedAt": null
       }
     ],
     "totalCount": 25,
     "totalPages": 3,
     "currentPage": 1,
     "pageSize": 10
   }
   ```

2. **Get Event by ID**
   ```
   GET /api/events/{id}
   ```

3. **Get Upcoming Events**
   ```
   GET /api/events/upcoming?limit=5
   ```

4. **Get Events by Date Range**
   ```
   GET /api/events/range?startDate=2024-12-01&endDate=2024-12-31
   ```

#### POST Endpoint

5. **Create Event**
   ```
   POST /api/events
   ```
   Request Body:
   ```json
   {
     "title": "Scholarship Test",
     "description": "Annual scholarship test...",
     "date": "2024-12-20",
     "time": "08:30:00",
     "endDate": null,
     "endTime": "12:00:00",
     "location": "Girls Campus Havelian",
     "category": "Academic",
     "imageUrl": "/uploads/events/image.jpg",
     "isPublished": true,
     "isFeatured": false,
     "displayOrder": 0
   }
   ```

#### PUT Endpoint

6. **Update Event**
   ```
   PUT /api/events/{id}
   ```

#### DELETE Endpoint

7. **Delete Event**
   ```
   DELETE /api/events/{id}
   ```

---

## 🎨 Frontend API Client Design

### File: `lib/api/news.ts`

```typescript
import { api, ApiError } from './client';

export interface News {
  id: number;
  title: string;
  slug: string;
  description: string;
  content?: string;
  category: string;
  imageUrl?: string;
  date: string;
  isPublished: boolean;
  isFeatured: boolean;
  isInMarquee: boolean;
  displayOrder: number;
  viewCount: number;
  createdAt: string;
  updatedAt?: string;
  createdBy?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface CreateNewsRequest {
  title: string;
  description: string;
  content?: string;
  category: string;
  imageUrl?: string;
  date: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  isInMarquee?: boolean;
  displayOrder?: number;
}

export interface UpdateNewsRequest extends Partial<CreateNewsRequest> {
  id: number;
}

export interface PaginatedNewsParams {
  page?: number;
  pageSize?: number;
  category?: string;
  isPublished?: boolean;
  search?: string;
  sortBy?: 'date' | 'title' | 'displayOrder';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedNewsResponse {
  data: News[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

/**
 * Get all news with pagination and filters
 */
export async function getNews(params?: PaginatedNewsParams): Promise<PaginatedNewsResponse> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.isPublished !== undefined) queryParams.append('isPublished', params.isPublished.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const queryString = queryParams.toString();
    return await api.get<PaginatedNewsResponse>(`/api/news${queryString ? `?${queryString}` : ''}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load news. Please try again.');
  }
}

/**
 * Get news by ID
 */
export async function getNewsById(id: number): Promise<News> {
  try {
    return await api.get<News>(`/api/news/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load news item. Please try again.');
  }
}

/**
 * Get news by slug
 */
export async function getNewsBySlug(slug: string): Promise<News> {
  try {
    return await api.get<News>(`/api/news/slug/${slug}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load news item. Please try again.');
  }
}

/**
 * Get featured news
 */
export async function getFeaturedNews(limit: number = 5): Promise<News[]> {
  try {
    return await api.get<News[]>(`/api/news/featured?limit=${limit}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load featured news. Please try again.');
  }
}

/**
 * Get marquee news items
 */
export async function getMarqueeNews(limit: number = 10): Promise<News[]> {
  try {
    return await api.get<News[]>(`/api/news/marquee?limit=${limit}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load marquee news. Please try again.');
  }
}

/**
 * Create new news item
 */
export async function createNews(data: CreateNewsRequest): Promise<News> {
  try {
    return await api.post<News>('/api/news', data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create news item. Please check your input and try again.');
  }
}

/**
 * Update news item
 */
export async function updateNews(data: UpdateNewsRequest): Promise<News> {
  try {
    return await api.put<News>(`/api/news/${data.id}`, data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update news item. Please check your input and try again.');
  }
}

/**
 * Delete news item
 */
export async function deleteNews(id: number): Promise<void> {
  try {
    await api.delete(`/api/news/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete news item. Please try again.');
  }
}
```

### File: `lib/api/events.ts`

```typescript
import { api, ApiError } from './client';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string; // ISO date string
  time?: string; // HH:mm:ss format
  endDate?: string;
  endTime?: string;
  location?: string;
  category: string;
  imageUrl?: string;
  isPublished: boolean;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt?: string;
  createdBy?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface CreateEventRequest {
  title: string;
  description: string;
  date: string;
  time?: string;
  endDate?: string;
  endTime?: string;
  location?: string;
  category: string;
  imageUrl?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  displayOrder?: number;
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {
  id: number;
}

export interface PaginatedEventsParams {
  page?: number;
  pageSize?: number;
  category?: string;
  isPublished?: boolean;
  upcoming?: boolean; // Only future events
  startDate?: string;
  endDate?: string;
  search?: string;
  sortBy?: 'date' | 'title' | 'displayOrder';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedEventsResponse {
  data: Event[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

/**
 * Get all events with pagination and filters
 */
export async function getEvents(params?: PaginatedEventsParams): Promise<PaginatedEventsResponse> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.isPublished !== undefined) queryParams.append('isPublished', params.isPublished.toString());
    if (params?.upcoming) queryParams.append('upcoming', 'true');
    if (params?.startDate) queryParams.append('startDate', params.startDate);
    if (params?.endDate) queryParams.append('endDate', params.endDate);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const queryString = queryParams.toString();
    return await api.get<PaginatedEventsResponse>(`/api/events${queryString ? `?${queryString}` : ''}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load events. Please try again.');
  }
}

/**
 * Get event by ID
 */
export async function getEventById(id: number): Promise<Event> {
  try {
    return await api.get<Event>(`/api/events/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load event. Please try again.');
  }
}

/**
 * Get upcoming events
 */
export async function getUpcomingEvents(limit: number = 5): Promise<Event[]> {
  try {
    return await api.get<Event[]>(`/api/events/upcoming?limit=${limit}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load upcoming events. Please try again.');
  }
}

/**
 * Create new event
 */
export async function createEvent(data: CreateEventRequest): Promise<Event> {
  try {
    return await api.post<Event>('/api/events', data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create event. Please check your input and try again.');
  }
}

/**
 * Update event
 */
export async function updateEvent(data: UpdateEventRequest): Promise<Event> {
  try {
    return await api.put<Event>(`/api/events/${data.id}`, data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update event. Please check your input and try again.');
  }
}

/**
 * Delete event
 */
export async function deleteEvent(id: number): Promise<void> {
  try {
    await api.delete(`/api/events/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete event. Please try again.');
  }
}
```

---

## 🖥️ Frontend Dashboard Pages Design

### 1. News Management Page

**Route:** `/dashboard/news`

**File:** `app/dashboard/news/page.tsx`

**Features:**
- List all news items in a table/grid
- Search and filter by category
- Pagination
- Quick actions: View, Edit, Delete, Toggle Publish
- "Add New News" button
- Bulk actions (if needed)

**UI Components:**
- `NewsTable` or `NewsGrid` component
- `NewsForm` modal/page for add/edit
- `ConfirmationDialog` for delete
- Filters sidebar/bar
- Status badges (Published/Draft, Featured)

**Layout Structure:**
```
┌─────────────────────────────────────────┐
│ News Management                        │
│ [+ Add New News]                       │
├─────────────────────────────────────────┤
│ [Search] [Category Filter] [Status]   │
├─────────────────────────────────────────┤
│ ID | Title | Category | Date | Actions │
│ 1  | ...   | ...      | ...  | [Edit]  │
│ 2  | ...   | ...      | ...  | [Edit]  │
├─────────────────────────────────────────┤
│ [< Prev] [1] [2] [3] [Next >]         │
└─────────────────────────────────────────┘
```

### 2. Events Management Page

**Route:** `/dashboard/events`

**File:** `app/dashboard/events/page.tsx`

**Features:**
- List all events in a table/calendar view
- Filter by category, date range, upcoming/past
- Pagination
- Quick actions: View, Edit, Delete, Toggle Publish
- "Add New Event" button

**UI Components:**
- `EventsTable` or `EventsCalendar` component
- `EventForm` modal/page for add/edit
- `ConfirmationDialog` for delete
- Date range picker
- Category filter

**Layout Structure:**
```
┌─────────────────────────────────────────┐
│ Events Management                      │
│ [+ Add New Event]                      │
├─────────────────────────────────────────┤
│ [Search] [Category] [Date Range]      │
├─────────────────────────────────────────┤
│ ID | Title | Date | Time | Actions    │
│ 1  | ...   | ...  | ...  | [Edit]     │
│ 2  | ...   | ...  | ...  | [Edit]     │
├─────────────────────────────────────────┤
│ [< Prev] [1] [2] [3] [Next >]         │
└─────────────────────────────────────────┘
```

### 3. News Form Component

**File:** `components/news/NewsForm.tsx`

**Fields:**
- Title* (text input)
- Slug (auto-generated from title, editable)
- Description* (textarea)
- Content (rich text editor, optional)
- Category* (dropdown/select)
- Image Upload (ProfileImageUpload component)
- Date* (date picker)
- Checkboxes:
  - Is Published
  - Is Featured
  - Show in Marquee
- Display Order (number input)

**Validation:**
- Title: Required, max 500 chars
- Description: Required, max 2000 chars
- Slug: Required, unique, URL-friendly
- Date: Required, valid date
- Category: Required

### 4. Event Form Component

**File:** `components/events/EventForm.tsx`

**Fields:**
- Title* (text input)
- Description* (textarea)
- Date* (date picker)
- Start Time (time picker, optional)
- End Date (date picker, optional - for multi-day)
- End Time (time picker, optional)
- Location (text input, optional)
- Category* (dropdown/select)
- Image Upload (ProfileImageUpload component)
- Checkboxes:
  - Is Published
  - Is Featured
- Display Order (number input)

**Validation:**
- Title: Required, max 500 chars
- Description: Required
- Date: Required, valid date
- End Date: Must be after Start Date (if provided)
- Category: Required

---

## 🔐 Role-Based Access Control

### Permissions

**Admin Role:**
- ✅ Full CRUD access to News
- ✅ Full CRUD access to Events
- ✅ Can publish/unpublish
- ✅ Can delete any news/event
- ✅ Can manage all categories

**Staff Role:**
- ✅ Full CRUD access to News
- ✅ Full CRUD access to Events
- ✅ Can publish/unpublish
- ✅ Can delete own news/event
- ⚠️ May need approval for deletion (optional)

**Other Roles (Teacher, Student, Parent):**
- ❌ No access to News/Events management
- ✅ Can view published news/events on frontend

### Implementation Pattern

```typescript
// In app/dashboard/news/page.tsx
useEffect(() => {
  const checkAuth = () => {
    if (!isAuthenticated()) {
      router.push('/login')
      return
    }

    const userRoles = getUserRoles()
    const canManage = userRoles.includes('Admin') || userRoles.includes('Staff')
    
    if (!canManage) {
      setAuthError('You do not have permission. Only Admin and Staff can manage news.')
      setTimeout(() => router.push('/dashboard'), 3000)
      return
    }
  }
  checkAuth()
}, [router])
```

---

## 📁 File Structure

```
app/
  dashboard/
    news/
      page.tsx                    # News list page
      [id]/
        page.tsx                  # News detail/edit page (optional)
      create/
        page.tsx                  # Create news page (optional - can use modal)
    events/
      page.tsx                    # Events list page
      [id]/
        page.tsx                  # Event detail/edit page (optional)
      create/
        page.tsx                  # Create event page (optional)

components/
  news/
    NewsTable.tsx                 # News list table component
    NewsForm.tsx                  # News add/edit form
    NewsCard.tsx                  # News card for grid view
    NewsModal.tsx                 # Modal wrapper for form
  events/
    EventsTable.tsx               # Events list table component
    EventForm.tsx                 # Event add/edit form
    EventCard.tsx                 # Event card for grid view
    EventModal.tsx                # Modal wrapper for form

lib/
  api/
    news.ts                       # News API client functions
    events.ts                     # Events API client functions
```

---

## 🎨 UI/UX Design Patterns

### Following Existing Patterns

Based on analysis of existing dashboard pages:

1. **Page Structure:**
   - Header with title and "Add New" button
   - Search and filter bar
   - Table/Grid with data
   - Pagination at bottom
   - Success/Error messages

2. **Form Pattern:**
   - Modal or separate page
   - FormField components for inputs
   - Validation with error messages
   - Save/Cancel buttons
   - Loading states

3. **Table Pattern:**
   - Sortable columns
   - Action buttons (Edit, Delete, View)
   - Status badges
   - Responsive design

4. **Confirmation Dialogs:**
   - Use existing `ConfirmationDialog` component
   - Show before delete operations

---

## 🔄 Data Flow

### Create News Flow:
```
User clicks "Add New News"
  → Opens NewsForm modal/page
  → User fills form
  → Clicks "Save"
  → Frontend validates
  → Calls createNews() from lib/api/news.ts
  → POST /api/news
  → Backend validates & saves to DB
  → Returns created News object
  → Frontend refreshes list
  → Shows success message
```

### Update News Flow:
```
User clicks "Edit" on news item
  → Opens NewsForm with existing data
  → User modifies fields
  → Clicks "Update"
  → Frontend validates
  → Calls updateNews() from lib/api/news.ts
  → PUT /api/news/{id}
  → Backend validates & updates DB
  → Returns updated News object
  → Frontend refreshes list
  → Shows success message
```

### Delete News Flow:
```
User clicks "Delete" on news item
  → Shows ConfirmationDialog
  → User confirms
  → Calls deleteNews() from lib/api/news.ts
  → DELETE /api/news/{id}
  → Backend deletes from DB
  → Frontend refreshes list
  → Shows success message
```

---

## 📝 Additional Features (Optional)

### 1. Image Upload
- Use existing `ProfileImageUpload` component pattern
- Upload to `/uploads/news/` or `/uploads/events/`
- Support image preview and crop

### 2. Rich Text Editor
- For News Content field
- Use library like `react-quill` or `tiptap`
- Save as HTML or Markdown

### 3. Slug Auto-Generation
- Auto-generate from title on blur
- Make editable
- Validate uniqueness

### 4. Preview Mode
- Preview how news/event will look on frontend
- Before publishing

### 5. Bulk Operations
- Select multiple items
- Bulk publish/unpublish
- Bulk delete (with confirmation)

### 6. Analytics
- Track view counts
- Show popular news
- Export reports

---

## ✅ Summary

This design provides:

1. ✅ **Complete Database Schema** for News and Events
2. ✅ **RESTful API Endpoints** design
3. ✅ **Frontend API Client** functions
4. ✅ **Dashboard Pages** structure
5. ✅ **Form Components** design
6. ✅ **Role-Based Access Control** (Admin & Staff)
7. ✅ **UI/UX Patterns** following existing codebase
8. ✅ **Data Flow** diagrams

**Next Steps:**
1. Implement backend API endpoints in ASP.NET Core
2. Create database migrations
3. Implement frontend API clients (`lib/api/news.ts`, `lib/api/events.ts`)
4. Build dashboard pages (`app/dashboard/news/page.tsx`, `app/dashboard/events/page.tsx`)
5. Create form components (`components/news/NewsForm.tsx`, `components/events/EventForm.tsx`)
6. Update home page components to fetch from API instead of constants
7. Test all CRUD operations
8. Add role-based access control

---

**Status:** ✅ Design Complete - Ready for Implementation

