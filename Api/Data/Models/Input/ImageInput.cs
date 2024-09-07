using Microsoft.AspNetCore.Http;

namespace Data.Models.Input
{
    public class ImageInput
    {
        public string Title { get; set; }
        public IFormFile File { get; set; }
    }
}
