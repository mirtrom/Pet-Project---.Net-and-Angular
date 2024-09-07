using Data.Data;
using Data.Models;
using Data.Repositories.Interfaces;

namespace Data.Repositories.Implementations
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(StoreDbContext context) : base(context)
        {
        }
    }
}
