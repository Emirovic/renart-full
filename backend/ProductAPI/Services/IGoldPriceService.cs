namespace ProductAPI.Services
{
    public interface IGoldPriceService
    {
        Task<decimal> GetGoldPriceAsync();
    }
}
