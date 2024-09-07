using Data.Models;
using Microsoft.AspNetCore.Http;

namespace Data.Repositories.Interfaces
{
    public interface IImageRepository: IRepository<Image>
    {
        Task<Image> Upload(IFormFile file, Image image);
    }
}
