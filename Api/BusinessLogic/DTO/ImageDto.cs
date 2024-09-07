using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTO
{
    public class ImageDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Extension { get; set; }

    }
}
