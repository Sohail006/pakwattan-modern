using System.ComponentModel.DataAnnotations;

namespace PakWattanAPI.Models
{
    public class Course
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(10)]
        public string? Code { get; set; }

        public int CreditHours { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Foreign Keys
        [Required]
        public int GradeId { get; set; }
        public virtual Grade Grade { get; set; } = null!;

        [Required]
        public int TeacherId { get; set; }
        public virtual Teacher Teacher { get; set; } = null!;

        // Navigation Properties
        public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();
    }
}
