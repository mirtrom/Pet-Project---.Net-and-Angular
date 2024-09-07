namespace Data.Models
{
    public class Product: AbstractModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public Guid? ImageId { get; set; }
        public Image Image { get; set; }
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
    }
}