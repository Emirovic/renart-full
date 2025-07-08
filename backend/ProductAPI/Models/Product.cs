using System.ComponentModel.DataAnnotations;

namespace ProductAPI.Models
{
    public class Product
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        public double PopularityScore { get; set; }
        
        [Required]
        public double Weight { get; set; }
        
        [Required]
        public ProductImages Images { get; set; } = new ProductImages();
        
        public decimal Price { get; set; }
        
        public double PopularityOutOfFive { get; set; }
    }
    
    public class ProductImages
    {
        [Required]
        public string Yellow { get; set; } = string.Empty;
        
        [Required]
        public string Rose { get; set; } = string.Empty;
        
        [Required]
        public string White { get; set; } = string.Empty;
    }
}
