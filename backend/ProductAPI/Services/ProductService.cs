using System.Text.Json;
using ProductAPI.Models;

namespace ProductAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly IGoldPriceService _goldPriceService;
        private readonly ILogger<ProductService> _logger;
        private readonly IWebHostEnvironment _env;

        public ProductService(IGoldPriceService goldPriceService, ILogger<ProductService> logger, IWebHostEnvironment env)
        {
            _goldPriceService = goldPriceService;
            _logger = logger;
            _env = env;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            try
            {
                var jsonPath = Path.Combine(_env.ContentRootPath, "products.json");
                var jsonContent = await File.ReadAllTextAsync(jsonPath);
                
                var products = JsonSerializer.Deserialize<Product[]>(jsonContent, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (products == null)
                {
                    throw new InvalidOperationException("Failed to deserialize products from JSON");
                }

                var goldPrice = await _goldPriceService.GetGoldPriceAsync();
                
                foreach (var product in products)
                {
                    // Calculate price: (popularityScore + 1) * weight * goldPrice
                    product.Price = (decimal)((product.PopularityScore + 1) * product.Weight) * goldPrice;
                    
                    // Convert popularity score to out of 5 with 1 decimal place
                    product.PopularityOutOfFive = Math.Round(product.PopularityScore * 5, 1);
                }

                return products;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error reading products from JSON file");
                throw;
            }
        }

        public async Task<IEnumerable<Product>> GetFilteredProductsAsync(decimal? minPrice, decimal? maxPrice, double? minPopularity, double? maxPopularity)
        {
            var products = await GetAllProductsAsync();
            
            var filteredProducts = products.AsEnumerable();

            if (minPrice.HasValue)
                filteredProducts = filteredProducts.Where(p => p.Price >= minPrice.Value);

            if (maxPrice.HasValue)
                filteredProducts = filteredProducts.Where(p => p.Price <= maxPrice.Value);

            if (minPopularity.HasValue)
                filteredProducts = filteredProducts.Where(p => p.PopularityScore >= minPopularity.Value);

            if (maxPopularity.HasValue)
                filteredProducts = filteredProducts.Where(p => p.PopularityScore <= maxPopularity.Value);

            return filteredProducts;
        }
    }
}
