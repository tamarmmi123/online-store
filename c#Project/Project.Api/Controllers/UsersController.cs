using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Project.Core;
using Project.Core.DTO;
using Project.Core.Service;
using Project.DTO;
using Project.Service.Service;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IMapper mapper;
        private readonly IConfiguration config;

        public UsersController(IUserService _userService, IMapper _mapper, IConfiguration _config)
        {
            userService = _userService;
            mapper = _mapper;
            this.config = config;
        }

        // GET: api/<UsersController>
        [HttpGet]
        public List<UserDTO> Get()
        {
            List<User> users = userService.GetAll();
            return mapper.Map<List<UserDTO>>(users);
        }

        [HttpGet("by-credentials")]
        public UserDTO GetByNameAndPassword([FromQuery] string name, [FromQuery] string password)
        {
            var user = userService.GetByNameAndPasssword(name, password);
            return mapper.Map<UserDTO>(user);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public UserDTO GetById(int id)
        {
            var user = userService.GetById(id);
            return mapper.Map<UserDTO> (user);
        }

        //[HttpGet("{id}")]
        //public async Task<ActionResult<User>> GetUserById(int id)
        //{
        //    var user = await _context.Users.FindAsync(id);
        //    if (user == null)
        //        return NotFound();
        //    return Ok(user);
        //}


        // POST api/<UsersController>
        [HttpPost]
        public IActionResult Post([FromBody] User u)
        {
            try
            {
                u.Role = "user";
                userService.AddUser(u);

                var token = GenerateJwtToken(u);
                return Ok(new { Token = token, User = u }); 
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(ClaimTypes.Role, user.Role),
        new Claim("id", user.Id.ToString()),
        new Claim("firstName", user.FirstName ?? ""),
        new Claim("lastName", user.LastName ?? ""),
        new Claim("email", user.Email ?? ""),
        new Claim("phoneNumber", user.PhoneNumber ?? ""),
        new Claim("address", user.Address ?? "")
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("SuperLongSecureKeyThatIsAtLeast32CharactersOrMoreForHmacSha256"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "https://localhost:7025/",
                audience: "https://localhost:7025/",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User u)
        {
            var existingUser = userService.GetById(id);
            if (id != existingUser.Id)
            {
                return BadRequest("ID in URL and body do not match");
            }
            if (existingUser == null)
            {
                return NotFound();
            }

            userService.UpdateUser(id, u);
            var updatedUser = userService.GetById(id);
            var newToken = GenerateJwtToken(updatedUser);
            return Ok(u);
        }


        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            userService.DeleteUser(id);
        }
    }
}
