using ProductAPI.Models;

namespace ProductAPI.Services
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<IEnumerable<Product>> GetFilteredProductsAsync(decimal? minPrice, decimal? maxPrice, double? minPopularity, double? maxPopularity);
    }
}
