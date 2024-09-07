using Data.Models;

namespace Data.Repositories.Interfaces
{
    public interface IProductRepository : IRepository<Product>
    {
        public Task<IEnumerable<Product>> GetAllWithDetailsAsync();
        public Task<Product> GetByIdWithDetailsAsync(Guid id);
    }
}
