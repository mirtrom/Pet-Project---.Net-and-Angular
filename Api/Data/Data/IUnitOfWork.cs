using Data.Repositories.Interfaces;

namespace Data.Data
{
    public interface IUnitOfWork
    {
        IProductRepository ProductRepository { get; set; }
        ICategoryRepository CategoryRepository { get; set; }

        IImageRepository ImageRepository { get; set; }
        Task SaveAsync();
    }
}
