using System.ComponentModel.DataAnnotations;

namespace PakWattanAPI.Models
{
    public class Exam
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [Required]
        public ExamType Type { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TotalMarks { get; set; }
        public int PassingMarks { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Foreign Keys
        [Required]
        public int CourseId { get; set; }
        public virtual Course Course { get; set; } = null!;

        [Required]
        public int SessionId { get; set; }
        public virtual Session Session { get; set; } = null!;

        // Navigation Properties
        public virtual ICollection<ExamResult> ExamResults { get; set; } = new List<ExamResult>();
    }

    public enum ExamType
    {
        Quiz,
        MidTerm,
        Final,
        Assignment,
        Project,
        Practical
    }
}
