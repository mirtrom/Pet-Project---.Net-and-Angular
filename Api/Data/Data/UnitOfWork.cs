using Data.Repositories.Implementations;
using Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

namespace Data.Data
{
    public class UnitOfWork
        : IUnitOfWork
    {
        private readonly StoreDbContext context;
        public UnitOfWork(StoreDbContext context)
        {
            this.context = context;
            ProductRepository = new ProductRepository(context);
            CategoryRepository = new CategoryRepository(context);
            ImageRepository = new ImageRepository(context);
        }
        public IProductRepository ProductRepository { get; set; }
        public ICategoryRepository CategoryRepository { get; set; }
        public IImageRepository ImageRepository { get; set; }

        public async Task SaveAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
