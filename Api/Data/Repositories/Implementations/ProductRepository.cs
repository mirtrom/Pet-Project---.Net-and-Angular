using Data.Data;
using Data.Models;
using Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories.Implementations
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(StoreDbContext context) : base(context)
        {
        }
        public async Task<IEnumerable<Product>> GetAllWithDetailsAsync()
        {
            return await dbSet
                .Include(p => p.Category)
                .Include(p => p.Image)
                .ToListAsync();
        }

        public async Task<Product> GetByIdWithDetailsAsync(Guid id)
        {
            return await dbSet
                .Include(p => p.Category)
                .Include(p => p.Image)
                .FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}
