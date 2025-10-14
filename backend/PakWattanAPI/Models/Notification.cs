using System.ComponentModel.DataAnnotations;

namespace PakWattanAPI.Models
{
    public class Notification
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(1000)]
        public string Message { get; set; } = string.Empty;

        [Required]
        public NotificationType Type { get; set; }

        [Required]
        public NotificationPriority Priority { get; set; }

        public bool IsRead { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ReadAt { get; set; }

        // Foreign Keys
        [Required]
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;
    }

    public enum NotificationType
    {
        General,
        Academic,
        Fee,
        Attendance,
        Exam,
        Emergency
    }

    public enum NotificationPriority
    {
        Low,
        Medium,
        High,
        Urgent
    }
}
