using System.ComponentModel.DataAnnotations;

namespace PakWattanAPI.Models
{
    public class Attendance
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public AttendanceStatus Status { get; set; }

        [StringLength(500)]
        public string? Remarks { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Foreign Keys
        [Required]
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;

        [Required]
        public int CourseId { get; set; }
        public virtual Course Course { get; set; } = null!;
    }

    public enum AttendanceStatus
    {
        Present,
        Absent,
        Late,
        Excused
    }
}
