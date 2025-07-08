using Microsoft.AspNetCore.Mvc;
using ProductAPI.Models;
using ProductAPI.Services;

namespace ProductAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(IProductService productService, ILogger<ProductsController> logger)
        {
            _productService = productService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] double? minPopularity,
            [FromQuery] double? maxPopularity)
        {
            try
            {
                IEnumerable<Product> products;

                if (minPrice.HasValue || maxPrice.HasValue || minPopularity.HasValue || maxPopularity.HasValue)
                {
                    products = await _productService.GetFilteredProductsAsync(minPrice, maxPrice, minPopularity, maxPopularity);
                }
                else
                {
                    products = await _productService.GetAllProductsAsync();
                }

                return Ok(products);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving products");
                return StatusCode(500, "An error occurred while retrieving products");
            }
        }
    }
}
