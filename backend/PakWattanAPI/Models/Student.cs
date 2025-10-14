using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PakWattanAPI.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string FatherName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [StringLength(256)]
        public string Email { get; set; } = string.Empty;

        [StringLength(20)]
        public string? Phone { get; set; }

        [StringLength(20)]
        public string? WhatsApp { get; set; }

        [Required]
        public Gender Gender { get; set; }

        [Required]
        public StudentStatus Status { get; set; }

        [StringLength(500)]
        public string? Address { get; set; }

        [StringLength(100)]
        public string? PreviousSchool { get; set; }

        [StringLength(500)]
        public string? ProfileImageUrl { get; set; }

        public DateTime DateOfBirth { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public bool IsActive { get; set; } = true;

        // Foreign Keys
        [Required]
        public int GradeId { get; set; }
        public virtual Grade Grade { get; set; } = null!;

        [Required]
        public int SectionId { get; set; }
        public virtual Section Section { get; set; } = null!;

        [Required]
        public int CampusId { get; set; }
        public virtual Campus Campus { get; set; } = null!;

        [Required]
        public int SessionId { get; set; }
        public virtual Session Session { get; set; } = null!;

        // Navigation Properties
        public virtual ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
        public virtual ICollection<ExamResult> ExamResults { get; set; } = new List<ExamResult>();
        public virtual ICollection<Fee> Fees { get; set; } = new List<Fee>();
        public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
    }

    public enum Gender
    {
        Male,
        Female,
        Other
    }

    public enum StudentStatus
    {
        Active,
        Inactive,
        Suspended,
        Graduated,
        Transferred
    }
}
