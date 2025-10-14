using System.ComponentModel.DataAnnotations;

namespace PakWattanAPI.Models
{
    public class FileUpload
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string FileName { get; set; } = string.Empty;

        [Required]
        [StringLength(500)]
        public string FilePath { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string ContentType { get; set; } = string.Empty;

        public long FileSize { get; set; }

        [Required]
        public FileType Type { get; set; }

        [StringLength(500)]
        public string? Description { get; set; }

        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;

        // Foreign Keys
        public int? StudentId { get; set; }
        public virtual Student? Student { get; set; }

        public int? TeacherId { get; set; }
        public virtual Teacher? Teacher { get; set; }
    }

    public enum FileType
    {
        ProfileImage,
        Document,
        Certificate,
        Report,
        Assignment,
        Other
    }
}
