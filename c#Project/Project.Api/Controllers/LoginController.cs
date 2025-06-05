using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using static System.Net.WebRequestMethods;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Project.Core.Service;


namespace Project.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUserService _userService;

        public LoginController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserLogin userLogin)
        {
            var user = await _userService.AuthenticateAsync(userLogin.UserName, userLogin.Password);

            if (user == null)
            {
                return Unauthorized(); // Invalid credentials
            }

            // Create claims
            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim("id", user.Id.ToString()),
            new Claim("firstName", user.FirstName),
            new Claim("lastName", user.LastName),
            new Claim("email", user.Email),
            new Claim("phoneNumber", user.PhoneNumber),
            new Claim("address", user.Address)
        };

            // Generate token
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MyUltraSecureKeyWithAtLeast32Chars"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                issuer: "https://localhost:7025/",
                audience: "https://localhost:7025/",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30), // Token expiration
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new
            {
                token = tokenString,
                user = user
            });

        }
    }

}