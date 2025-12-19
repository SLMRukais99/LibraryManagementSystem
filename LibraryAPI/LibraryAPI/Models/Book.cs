using System.ComponentModel.DataAnnotations;

namespace LibraryAPI.Models
{
    public class Book
    {
        public int Id { get; set; } // Primary Key

        [Required, StringLength(100)]
        public string Title { get; set; } // Title cannot exceed 100 characters

        [Required, StringLength(100)]
        public string Author { get; set; } // Author cannot exceed 100 characters

        [StringLength(500)]
        public string Description { get; set; } // Optional, max 500 characters
    }
}