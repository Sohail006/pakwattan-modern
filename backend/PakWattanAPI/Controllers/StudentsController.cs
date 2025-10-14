using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PakWattanAPI.Data;
using PakWattanAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using PakWattanAPI.Hubs;

namespace PakWattanAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class StudentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHubContext<NotificationHub> _hubContext;

        public StudentsController(ApplicationDbContext context, IHubContext<NotificationHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await _context.Students
                .Include(s => s.Grade)
                .Include(s => s.Section)
                .Include(s => s.Campus)
                .Include(s => s.Session)
                .Where(s => s.IsActive)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Students
                .Include(s => s.Grade)
                .Include(s => s.Section)
                .Include(s => s.Campus)
                .Include(s => s.Session)
                .FirstOrDefaultAsync(s => s.Id == id && s.IsActive);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        [HttpPost]
        public async Task<ActionResult<Student>> CreateStudent(Student student)
        {
            student.CreatedAt = DateTime.UtcNow;
            student.IsActive = true;

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            // Send real-time notification
            await _hubContext.Clients.All.SendAsync("StudentCreated", new
            {
                Id = student.Id,
                Name = student.Name,
                Email = student.Email,
                GradeName = student.Grade?.Name,
                SectionName = student.Section?.Name
            });

            return CreatedAtAction(nameof(GetStudent), new { id = student.Id }, student);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, Student student)
        {
            if (id != student.Id)
            {
                return BadRequest();
            }

            var existingStudent = await _context.Students.FindAsync(id);
            if (existingStudent == null)
            {
                return NotFound();
            }

            existingStudent.Name = student.Name;
            existingStudent.FatherName = student.FatherName;
            existingStudent.Email = student.Email;
            existingStudent.Phone = student.Phone;
            existingStudent.WhatsApp = student.WhatsApp;
            existingStudent.Gender = student.Gender;
            existingStudent.Status = student.Status;
            existingStudent.Address = student.Address;
            existingStudent.PreviousSchool = student.PreviousSchool;
            existingStudent.ProfileImageUrl = student.ProfileImageUrl;
            existingStudent.DateOfBirth = student.DateOfBirth;
            existingStudent.GradeId = student.GradeId;
            existingStudent.SectionId = student.SectionId;
            existingStudent.CampusId = student.CampusId;
            existingStudent.SessionId = student.SessionId;
            existingStudent.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();

                // Send real-time notification
                await _hubContext.Clients.All.SendAsync("StudentUpdated", new
                {
                    Id = student.Id,
                    Name = student.Name,
                    Email = student.Email
                });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            student.IsActive = false;
            student.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // Send real-time notification
            await _hubContext.Clients.All.SendAsync("StudentDeleted", new
            {
                Id = student.Id,
                Name = student.Name
            });

            return NoContent();
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Student>>> SearchStudents([FromQuery] string? name, [FromQuery] int? gradeId, [FromQuery] int? sectionId)
        {
            var query = _context.Students
                .Include(s => s.Grade)
                .Include(s => s.Section)
                .Include(s => s.Campus)
                .Include(s => s.Session)
                .Where(s => s.IsActive);

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(s => s.Name.Contains(name) || s.FatherName.Contains(name));
            }

            if (gradeId.HasValue)
            {
                query = query.Where(s => s.GradeId == gradeId.Value);
            }

            if (sectionId.HasValue)
            {
                query = query.Where(s => s.SectionId == sectionId.Value);
            }

            return await query.ToListAsync();
        }

        private bool StudentExists(int id)
        {
            return _context.Students.Any(e => e.Id == id);
        }
    }
}
