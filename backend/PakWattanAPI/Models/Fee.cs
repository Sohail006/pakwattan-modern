using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PakWattanAPI.Models
{
    public class Fee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required]
        public FeeType Type { get; set; }

        [Required]
        public FeeFrequency Frequency { get; set; }

        public DateTime DueDate { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Foreign Keys
        [Required]
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;

        // Navigation Properties
        public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
    }

    public enum FeeType
    {
        Tuition,
        Admission,
        Library,
        Laboratory,
        Sports,
        Transportation,
        Other
    }

    public enum FeeFrequency
    {
        Monthly,
        Quarterly,
        Semester,
        Annual,
        OneTime
    }
}
