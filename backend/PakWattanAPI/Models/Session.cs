using System.ComponentModel.DataAnnotations;

namespace PakWattanAPI.Models
{
    public class Session
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string Name { get; set; } = string.Empty; // e.g., "2024-2025"

        [Required]
        public int StartYear { get; set; }

        [Required]
        public int EndYear { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsCurrent { get; set; } = false;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public virtual ICollection<Student> Students { get; set; } = new List<Student>();
        public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();
    }
}
