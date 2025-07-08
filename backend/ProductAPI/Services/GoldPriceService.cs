using System.Text.Json;

namespace ProductAPI.Services
{
    public class GoldPriceService : IGoldPriceService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<GoldPriceService> _logger;

        public GoldPriceService(HttpClient httpClient, ILogger<GoldPriceService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<decimal> GetGoldPriceAsync()
        {
            try
            {
                // Using a free API to get gold price
                var response = await _httpClient.GetAsync("https://api.metals.live/v1/spot/gold");
                
                if (response.IsSuccessStatusCode)
                {
                    var jsonContent = await response.Content.ReadAsStringAsync();
                    var goldData = JsonSerializer.Deserialize<GoldPriceResponse>(jsonContent);
                    
                    // Convert from troy ounce to gram (1 troy ounce = 31.1035 grams)
                    if (goldData != null && goldData.price > 0)
                    {
                        return (decimal)(goldData.price / 31.1035);
                    }
                }
                
                _logger.LogWarning("Failed to fetch gold price from API, using fallback price");
                return 65.00m; // Fallback price per gram in USD
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching gold price");
                return 65.00m; // Fallback price per gram in USD
            }
        }
    }

    public class GoldPriceResponse
    {
        public double price { get; set; }
        public string currency { get; set; } = string.Empty;
        public string metal { get; set; } = string.Empty;
    }
}
