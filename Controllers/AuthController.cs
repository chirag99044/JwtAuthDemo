using Azure.Core;
using JwtAuthDemo.Data;
using JwtAuthDemo.DTOS;
using JwtAuthDemo.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JwtAuthDemo.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto request)
        {
            if (await _context.users.AnyAsync(u => u.Username == request.Username))
                return StatusCode(StatusCodes.Status403Forbidden,"User Already Exist");

            var User = new User
            {
                Username = request.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Role = "User"
            };

            _context.Add(User);
            await _context.SaveChangesAsync();
            return Ok("User Register SuccessFully");
        }

        [HttpPost("login")]
        public Task<IActionResult> Login(UserDto request)
        {
            var User = _context.users.FirstOrDefault(u =>  u.Username == request.Username);
            if(User == null || !BCrypt.Net.BCrypt.Verify(request.Password, User.PasswordHash))
                    return Task.FromResult<IActionResult>(BadRequest("Invelid UserName or Password"));

            var token = GenerateJwtToken(User);
            return Task.FromResult<IActionResult>(Ok(new { token }));
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role)
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["JwtSettings:Issuer"],
                audience: _config["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddSeconds(60),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
