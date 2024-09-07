using Data.Models;

namespace BusinessLogic.DTO
{
    public class ProductDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public Guid ImageId { get; set; }
        public Image Image { get; set; }
        public Guid CategoryId { get; set; }
        public CategoryDto Category { get; set; }
    }
}