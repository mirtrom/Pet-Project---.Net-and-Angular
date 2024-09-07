using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTO
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public string Email { get; set; }
        public ICollection<string> Roles { get; set; }
    }
}
