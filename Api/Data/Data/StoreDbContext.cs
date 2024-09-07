using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Data
{
    public class StoreDbContext: DbContext
    {
        public StoreDbContext(DbContextOptions<StoreDbContext> options) : base(options)
        {
        }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}
