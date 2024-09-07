using BusinessLogic.DTO;
using Data.Models.Input.Auth;
using Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(UserManager<IdentityUser> userManager, ITokenRepository tokenRepository) : ControllerBase
    {

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody]RegisterInput registerInput)
        {
            if (registerInput == null)
            {
                return BadRequest();
            }

            var user = new IdentityUser
            {
                UserName = registerInput.Email.Trim(),
                Email = registerInput.Email.Trim()
            };

            var result = await userManager.CreateAsync(user, registerInput.Password);
            if (result.Succeeded)
            {
                result = await userManager.AddToRoleAsync(user, "User");
                if (result.Succeeded)
                {
                    return Ok(user);
                }
            }
            else
            {
                if (result.Errors.Any())
                {
                    return BadRequest(result.Errors.Select(e => e.Description));
                }
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody]LoginInput loginInput)
        {
            if (loginInput == null)
            {
                return BadRequest();
            }

            var user = await userManager.FindByEmailAsync(loginInput.Email);
            if (user != null && await userManager.CheckPasswordAsync(user, loginInput.Password))
            {
                var roles = await userManager.GetRolesAsync(user);
                var token = tokenRepository.GenerateToken(user, roles.ToList());
                var responce = new LoginResponseDto
                {
                    Email = user.Email,
                    Roles = roles,
                    Token = token
                };
                return Ok(responce);
            }
            return Unauthorized();
        }   
    }
}
