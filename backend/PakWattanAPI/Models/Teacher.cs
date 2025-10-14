using System.ComponentModel.DataAnnotations;

namespace PakWattanAPI.Models
{
    public class Teacher
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

        [Required]
        public Gender Gender { get; set; }

        [StringLength(500)]
        public string? Address { get; set; }

        [StringLength(200)]
        public string? Qualification { get; set; }

        [StringLength(200)]
        public string? Specialization { get; set; }

        [StringLength(500)]
        public string? ProfileImageUrl { get; set; }

        public DateTime DateOfBirth { get; set; }
        public DateTime JoiningDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public bool IsActive { get; set; } = true;

        // Foreign Keys
        [Required]
        public int CampusId { get; set; }
        public virtual Campus Campus { get; set; } = null!;

        // Navigation Properties
        public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
    }
}
