using Data.Data;
using Data.Models;
using Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Data.Repositories.Implementations
{
    public class ImageRepository : Repository<Image>, IImageRepository
    {

        public ImageRepository(StoreDbContext context) : base(context)
        {
        }
        public async Task<Image> Upload(IFormFile file, Image image)
        {
            string wwwRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            string imagesFolder = Path.Combine(wwwRootPath, "Images");
            string localPath = Path.Combine(imagesFolder, $"{image.Title}{image.Extension}");
            using var stream = new FileStream(localPath, FileMode.Create);
            await file.CopyToAsync(stream);

            string baseUrl = "/Images";
            image.Url = $"{baseUrl}/{image.Title}{image.Extension}";

            await AddAsync(image);
            return image;
        }
    }
}
