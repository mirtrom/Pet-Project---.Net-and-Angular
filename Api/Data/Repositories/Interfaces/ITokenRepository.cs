﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories.Interfaces
{
    public interface ITokenRepository
    {
        string GenerateToken(IdentityUser user, List<string> roles);
    }
}
