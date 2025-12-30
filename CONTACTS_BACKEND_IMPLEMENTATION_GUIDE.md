# 🔧 Contacts Dashboard - Backend Implementation Guide

**Date:** December 2024  
**Purpose:** Guide for implementing backend APIs for Contacts Dashboard  
**Status:** ⚠️ **Backend APIs Required**

---

## ⚠️ Current Issue

The frontend is trying to call backend API endpoints that don't exist yet:
- `/api/it-support` - **404 Error**
- `/api/coordinators` - **404 Error** (when used)
- `/api/contact-persons` - **404 Error** (when used)

The frontend has been updated to handle 404 errors gracefully, but the backend APIs need to be created.

---

## 📋 Required Backend Implementation

### **1. IT Support Team API**

#### **Model: `ITSupportTeam.cs`**
```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PakWattanAPI.Models
{
    public class ITSupportTeam
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty; // "IT Support Team"

        [Required]
        [EmailAddress]
        [StringLength(255)]
        public string Email { get; set; } = string.Empty;

        [StringLength(50)]
        public string? Phone { get; set; }

        [StringLength(50)]
        public string? MobileNumber { get; set; }

        [StringLength(50)]
        public string? WhatsAppNumber { get; set; }

        [StringLength(200)]
        public string? OfficeHours { get; set; } // "Monday-Friday: 9AM-5PM"

        [StringLength(100)]
        public string? Department { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Description { get; set; }

        public int Priority { get; set; } = 0; // Lower = higher priority

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        [StringLength(450)]
        public string? CreatedByUserId { get; set; }

        [StringLength(450)]
        public string? UpdatedByUserId { get; set; }
    }
}
```

#### **DTOs: `ITSupportDtos.cs`**
```csharp
namespace PakWattanAPI.DTOs.ITSupport
{
    public class ITSupportCreateDto
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public string? Phone { get; set; }
        public string? MobileNumber { get; set; }
        public string? WhatsAppNumber { get; set; }
        public string? OfficeHours { get; set; }
        public string? Department { get; set; }
        public string? Description { get; set; }
        public int Priority { get; set; } = 0;
        public bool IsActive { get; set; } = true;
    }

    public class ITSupportUpdateDto
    {
        public string? Title { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? MobileNumber { get; set; }
        public string? WhatsAppNumber { get; set; }
        public string? OfficeHours { get; set; }
        public string? Department { get; set; }
        public string? Description { get; set; }
        public int? Priority { get; set; }
        public bool? IsActive { get; set; }
    }

    public class ITSupportResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? MobileNumber { get; set; }
        public string? WhatsAppNumber { get; set; }
        public string? OfficeHours { get; set; }
        public string? Department { get; set; }
        public string? Description { get; set; }
        public int Priority { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
```

#### **Service: `IITSupportService.cs` and `ITSupportService.cs`**
```csharp
// IITSupportService.cs
namespace PakWattanAPI.Services.ITSupport
{
    public interface IITSupportService
    {
        Task<IEnumerable<ITSupportTeam>> GetAllAsync(CancellationToken ct = default);
        Task<ITSupportTeam?> GetByIdAsync(int id, CancellationToken ct = default);
        Task<ITSupportTeam> CreateAsync(ITSupportCreateDto dto, string userId, CancellationToken ct = default);
        Task<ITSupportTeam> UpdateAsync(int id, ITSupportUpdateDto dto, string userId, CancellationToken ct = default);
        Task<bool> DeleteAsync(int id, CancellationToken ct = default);
    }
}

// ITSupportService.cs
namespace PakWattanAPI.Services.ITSupport
{
    public class ITSupportService : IITSupportService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ITSupportService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ITSupportTeam>> GetAllAsync(CancellationToken ct = default)
        {
            return await _context.ITSupportTeams
                .Where(x => x.IsActive)
                .OrderBy(x => x.Priority)
                .ThenBy(x => x.CreatedAt)
                .ToListAsync(ct);
        }

        public async Task<ITSupportTeam?> GetByIdAsync(int id, CancellationToken ct = default)
        {
            return await _context.ITSupportTeams.FindAsync(new object[] { id }, ct);
        }

        public async Task<ITSupportTeam> CreateAsync(ITSupportCreateDto dto, string userId, CancellationToken ct = default)
        {
            var entity = _mapper.Map<ITSupportTeam>(dto);
            entity.CreatedByUserId = userId;
            entity.CreatedAt = DateTime.UtcNow;

            _context.ITSupportTeams.Add(entity);
            await _context.SaveChangesAsync(ct);
            return entity;
        }

        public async Task<ITSupportTeam> UpdateAsync(int id, ITSupportUpdateDto dto, string userId, CancellationToken ct = default)
        {
            var entity = await _context.ITSupportTeams.FindAsync(new object[] { id }, ct);
            if (entity == null)
                throw new NotFoundException($"IT Support entry with ID {id} not found.");

            _mapper.Map(dto, entity);
            entity.UpdatedByUserId = userId;
            entity.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync(ct);
            return entity;
        }

        public async Task<bool> DeleteAsync(int id, CancellationToken ct = default)
        {
            var entity = await _context.ITSupportTeams.FindAsync(new object[] { id }, ct);
            if (entity == null)
                return false;

            entity.IsActive = false; // Soft delete
            entity.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync(ct);
            return true;
        }
    }
}
```

#### **Controller: `ITSupportController.cs`**
```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PakWattanAPI.DTOs.ITSupport;
using PakWattanAPI.Services.ITSupport;

namespace PakWattanAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin,Staff")]
    public class ITSupportController : ControllerBase
    {
        private readonly IITSupportService _service;
        private readonly IMapper _mapper;

        public ITSupportController(IITSupportService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ITSupportResponseDto>>> GetAll()
        {
            var items = await _service.GetAllAsync();
            var dtos = _mapper.Map<IEnumerable<ITSupportResponseDto>>(items);
            return Ok(dtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ITSupportResponseDto>> GetById(int id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item == null)
                return NotFound();

            var dto = _mapper.Map<ITSupportResponseDto>(item);
            return Ok(dto);
        }

        [HttpPost]
        public async Task<ActionResult<ITSupportResponseDto>> Create([FromBody] ITSupportCreateDto dto)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var entity = await _service.CreateAsync(dto, userId);
            var responseDto = _mapper.Map<ITSupportResponseDto>(entity);
            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, responseDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ITSupportUpdateDto dto)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            try
            {
                var entity = await _service.UpdateAsync(id, dto, userId);
                return NoContent();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
```

---

### **2. Coordinators API**

#### **Model: `Coordinator.cs`**
```csharp
namespace PakWattanAPI.Models
{
    public class Coordinator
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;

        [StringLength(200)]
        public string? Title { get; set; } // "Academic Coordinator"

        [Required]
        [EmailAddress]
        [StringLength(255)]
        public string Email { get; set; } = string.Empty;

        [StringLength(50)]
        public string? Phone { get; set; }

        [StringLength(50)]
        public string? MobileNumber { get; set; }

        [StringLength(50)]
        public string? WhatsAppNumber { get; set; }

        public int? CampusId { get; set; }
        [ForeignKey(nameof(CampusId))]
        public virtual Campus? Campus { get; set; }

        [StringLength(100)]
        public string? Department { get; set; }

        [StringLength(200)]
        public string? OfficeLocation { get; set; }

        [StringLength(200)]
        public string? OfficeHours { get; set; }

        [StringLength(500)]
        public string? ProfileImageUrl { get; set; }

        public int Priority { get; set; } = 0;

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        [StringLength(450)]
        public string? CreatedByUserId { get; set; }

        [StringLength(450)]
        public string? UpdatedByUserId { get; set; }
    }
}
```

#### **DTOs: `CoordinatorDtos.cs`**
```csharp
namespace PakWattanAPI.DTOs.Coordinators
{
    public class CoordinatorCreateDto
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        public string? Title { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public string? Phone { get; set; }
        public string? MobileNumber { get; set; }
        public string? WhatsAppNumber { get; set; }
        public int? CampusId { get; set; }
        public string? Department { get; set; }
        public string? OfficeLocation { get; set; }
        public string? OfficeHours { get; set; }
        public string? ProfileImageUrl { get; set; }
        public int Priority { get; set; } = 0;
        public bool IsActive { get; set; } = true;
    }

    public class CoordinatorUpdateDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Title { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? MobileNumber { get; set; }
        public string? WhatsAppNumber { get; set; }
        public int? CampusId { get; set; }
        public string? Department { get; set; }
        public string? OfficeLocation { get; set; }
        public string? OfficeHours { get; set; }
        public string? ProfileImageUrl { get; set; }
        public int? Priority { get; set; }
        public bool? IsActive { get; set; }
    }

    public class CoordinatorResponseDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Title { get; set; }
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? MobileNumber { get; set; }
        public string? WhatsAppNumber { get; set; }
        public int? CampusId { get; set; }
        public CampusResponseDto? Campus { get; set; }
        public string? Department { get; set; }
        public string? OfficeLocation { get; set; }
        public string? OfficeHours { get; set; }
        public string? ProfileImageUrl { get; set; }
        public int Priority { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
```

#### **Service & Controller:** Similar pattern to IT Support

---

### **3. Contact Persons API**

#### **Model: `ContactPerson.cs`**
```csharp
namespace PakWattanAPI.Models
{
    public class ContactPerson
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string ContactType { get; set; } = string.Empty; // "Administration", "Finance", etc.

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(200)]
        public string? Title { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(255)]
        public string Email { get; set; } = string.Empty;

        [StringLength(50)]
        public string? Phone { get; set; }

        [StringLength(50)]
        public string? MobileNumber { get; set; }

        [StringLength(50)]
        public string? WhatsAppNumber { get; set; }

        [StringLength(100)]
        public string? Department { get; set; }

        [StringLength(200)]
        public string? OfficeLocation { get; set; }

        [StringLength(200)]
        public string? OfficeHours { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Description { get; set; }

        public int Priority { get; set; } = 0;

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        [StringLength(450)]
        public string? CreatedByUserId { get; set; }

        [StringLength(450)]
        public string? UpdatedByUserId { get; set; }
    }
}
```

#### **DTOs, Service & Controller:** Similar pattern to IT Support

---

### **4. Enhanced Campus Model**

#### **Update `Campus.cs`**
```csharp
// Add these properties to existing Campus model:
[StringLength(50)]
public string? MobileNumber { get; set; }

[StringLength(50)]
public string? WhatsAppNumber { get; set; }

[StringLength(200)]
public string? OfficeHours { get; set; }

public int Priority { get; set; } = 0;

// Add relationship:
public virtual ICollection<Coordinator> Coordinators { get; set; } = new List<Coordinator>();
```

---

## 🗄️ Database Migration

### **SQL Script:**
```sql
-- IT Support Teams Table
CREATE TABLE ITSupportTeams (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,
    Email NVARCHAR(255) NOT NULL,
    Phone NVARCHAR(50),
    MobileNumber NVARCHAR(50),
    WhatsAppNumber NVARCHAR(50),
    OfficeHours NVARCHAR(200),
    Department NVARCHAR(100),
    Description NVARCHAR(MAX),
    Priority INT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2,
    CreatedByUserId NVARCHAR(450),
    UpdatedByUserId NVARCHAR(450)
);

-- Coordinators Table
CREATE TABLE Coordinators (
    Id INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Title NVARCHAR(200),
    Email NVARCHAR(255) NOT NULL,
    Phone NVARCHAR(50),
    MobileNumber NVARCHAR(50),
    WhatsAppNumber NVARCHAR(50),
    CampusId INT NULL,
    Department NVARCHAR(100),
    OfficeLocation NVARCHAR(200),
    OfficeHours NVARCHAR(200),
    ProfileImageUrl NVARCHAR(500),
    Priority INT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2,
    CreatedByUserId NVARCHAR(450),
    UpdatedByUserId NVARCHAR(450),
    FOREIGN KEY (CampusId) REFERENCES Campuses(Id)
);

-- Contact Persons Table
CREATE TABLE ContactPersons (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ContactType NVARCHAR(50) NOT NULL,
    Name NVARCHAR(200) NOT NULL,
    Title NVARCHAR(200),
    Email NVARCHAR(255) NOT NULL,
    Phone NVARCHAR(50),
    MobileNumber NVARCHAR(50),
    WhatsAppNumber NVARCHAR(50),
    Department NVARCHAR(100),
    OfficeLocation NVARCHAR(200),
    OfficeHours NVARCHAR(200),
    Description NVARCHAR(MAX),
    Priority INT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2,
    CreatedByUserId NVARCHAR(450),
    UpdatedByUserId NVARCHAR(450)
);

-- Enhanced Campuses Table
ALTER TABLE Campuses
ADD MobileNumber NVARCHAR(50),
    WhatsAppNumber NVARCHAR(50),
    OfficeHours NVARCHAR(200),
    Priority INT NOT NULL DEFAULT 0;
```

---

## 📝 Implementation Steps

### **Step 1: Create Models**
1. Create `Models/ITSupportTeam.cs`
2. Create `Models/Coordinator.cs`
3. Create `Models/ContactPerson.cs`
4. Update `Models/Campus.cs` (add new fields)

### **Step 2: Update DbContext**
```csharp
// ApplicationDbContext.cs
public DbSet<ITSupportTeam> ITSupportTeams { get; set; }
public DbSet<Coordinator> Coordinators { get; set; }
public DbSet<ContactPerson> ContactPersons { get; set; }
```

### **Step 3: Create DTOs**
1. Create `DTOs/ITSupport/ITSupportDtos.cs`
2. Create `DTOs/Coordinators/CoordinatorDtos.cs`
3. Create `DTOs/ContactPersons/ContactPersonDtos.cs`
4. Update `DTOs/Campuses/CampusDtos.cs`

### **Step 4: Create Services**
1. Create `Services/ITSupport/IITSupportService.cs` and `ITSupportService.cs`
2. Create `Services/Coordinators/ICoordinatorService.cs` and `CoordinatorService.cs`
3. Create `Services/ContactPersons/IContactPersonService.cs` and `ContactPersonService.cs`

### **Step 5: Create Controllers**
1. Create `Controllers/ITSupportController.cs`
2. Create `Controllers/CoordinatorsController.cs`
3. Create `Controllers/ContactPersonsController.cs`

### **Step 6: Configure AutoMapper**
```csharp
// ApiMappingProfile.cs
CreateMap<ITSupportCreateDto, ITSupportTeam>();
CreateMap<ITSupportUpdateDto, ITSupportTeam>();
CreateMap<ITSupportTeam, ITSupportResponseDto>();

CreateMap<CoordinatorCreateDto, Coordinator>();
CreateMap<CoordinatorUpdateDto, Coordinator>();
CreateMap<Coordinator, CoordinatorResponseDto>()
    .ForMember(dest => dest.Campus, opt => opt.MapFrom(src => src.Campus));

CreateMap<ContactPersonCreateDto, ContactPerson>();
CreateMap<ContactPersonUpdateDto, ContactPerson>();
CreateMap<ContactPerson, ContactPersonResponseDto>();
```

### **Step 7: Register Services**
```csharp
// Program.cs or Startup.cs
builder.Services.AddScoped<IITSupportService, ITSupportService>();
builder.Services.AddScoped<ICoordinatorService, CoordinatorService>();
builder.Services.AddScoped<IContactPersonService, ContactPersonService>();
```

### **Step 8: Create Migration**
```bash
dotnet ef migrations add AddContactsManagement
dotnet ef database update
```

---

## 🔗 API Endpoints Summary

### **IT Support**
- `GET /api/it-support` - Get all IT support entries
- `GET /api/it-support/{id}` - Get by ID
- `POST /api/it-support` - Create (Admin/Staff only)
- `PUT /api/it-support/{id}` - Update (Admin/Staff only)
- `DELETE /api/it-support/{id}` - Delete (Admin/Staff only)

### **Coordinators**
- `GET /api/coordinators` - Get all coordinators
- `GET /api/coordinators?campusId={id}` - Filter by campus
- `GET /api/coordinators/{id}` - Get by ID
- `POST /api/coordinators` - Create (Admin/Staff only)
- `PUT /api/coordinators/{id}` - Update (Admin/Staff only)
- `DELETE /api/coordinators/{id}` - Delete (Admin/Staff only)

### **Contact Persons**
- `GET /api/contact-persons` - Get all contact persons
- `GET /api/contact-persons?type={type}` - Filter by type
- `GET /api/contact-persons/{id}` - Get by ID
- `POST /api/contact-persons` - Create (Admin/Staff only)
- `PUT /api/contact-persons/{id}` - Update (Admin/Staff only)
- `DELETE /api/contact-persons/{id}` - Delete (Admin/Staff only)

### **Campuses (Enhanced)**
- `PUT /api/campuses/{id}` - Update with new fields (mobileNumber, whatsAppNumber, officeHours, priority)

---

## ✅ Frontend Error Handling

The frontend has been updated to:
- ✅ Return empty arrays for GET requests when endpoint returns 404
- ✅ Show user-friendly error messages for POST/PUT/DELETE when endpoint returns 404
- ✅ Log warnings in development mode

**Error Message Users Will See:**
> "The IT Support API endpoint is not available yet. Please contact the administrator to set up the backend API."

---

## 🚀 Quick Start

1. **Copy the model code** above into your `PakWattanAPI/Models/` directory
2. **Create DTOs** following the pattern
3. **Create Services** following the Jobs/Guardians pattern
4. **Create Controllers** following the JobsController pattern
5. **Update DbContext** to include new DbSets
6. **Run migration** to create tables
7. **Test endpoints** using Postman or Swagger

---

**Status:** ⚠️ **Backend Implementation Required**  
**Frontend:** ✅ **Ready and Waiting**
