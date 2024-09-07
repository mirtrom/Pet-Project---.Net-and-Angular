namespace Data.Models
{
    public class Image
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Extension { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
