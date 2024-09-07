using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class Category: AbstractModel
    {
        [Required]
        [MaxLength(30)]
        public string Name { get; set; }
        public IEnumerable<Product> Products { get; set; }

    }
}
