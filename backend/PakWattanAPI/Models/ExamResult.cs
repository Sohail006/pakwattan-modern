using System.ComponentModel.DataAnnotations;

namespace PakWattanAPI.Models
{
    public class ExamResult
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ObtainedMarks { get; set; }

        [Required]
        public int TotalMarks { get; set; }

        public decimal Percentage => TotalMarks > 0 ? (decimal)ObtainedMarks / TotalMarks * 100 : 0;

        [StringLength(2)]
        public string? Grade { get; set; }

        [StringLength(500)]
        public string? Remarks { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Foreign Keys
        [Required]
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;

        [Required]
        public int ExamId { get; set; }
        public virtual Exam Exam { get; set; } = null!;
    }
}
