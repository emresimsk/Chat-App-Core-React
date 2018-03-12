using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ChatAppCoreReact.IdentityModel;
using ChatAppCoreReact.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.KeyVault.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace ChatAppCoreReact.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Auth/[action]")]
    public class AuthController : Controller
    {
        private RoleManager<IdentityRole> roleManager;
        private SignInManager<ApplicationUser> singInManager;
        private readonly UserManager<ApplicationUser> userManager;

        public AuthController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager,
            SignInManager<ApplicationUser> singInManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.singInManager = singInManager;
        }

        public static IConfiguration Configuration { get; set; }

        [HttpPost]
        public async Task<LoginResponse> Login([FromBody] UserLoginModel info)
        {
            if (!ModelState.IsValid)
            {
                return new LoginResponse {Code = Unauthorized().StatusCode, Message = "Username or Password is null", TokenResult = null};
            }

            var userInfo = await userManager.FindByNameAsync(info.Username);
            var result = await userManager.CheckPasswordAsync(userInfo, info.Password);

            if (!result)
                return new LoginResponse {Code = Unauthorized().StatusCode, Message = "Login fail", TokenResult = null};

            var userRoles = await userManager.GetRolesAsync(userInfo);

            return new LoginResponse
            {
                Code = Ok().StatusCode,
                Message = "Login Success",
                TokenResult = GenerateToken(userInfo, userRoles),
                Id = userInfo.Id
            };
        }

        [HttpPost]
        public async Task<ResponseModel> Register([FromBody] UserRegisterModel info)
        {
            if (!ModelState.IsValid)
            {
                return new ResponseModel() {IsSuccess = false, Message = "Fields will not be empty"};
            }

            var user = new ApplicationUser() { UserName = info.Username,Email = info.Email};
            var result = await userManager.CreateAsync(user, info.Password);

            if (result.Succeeded)
            {
                return new ResponseModel() {IsSuccess = true, Message = "Register Success"};
            }
            else
            {
                return new ResponseModel() {IsSuccess = false, Message = result.Errors.FirstOrDefault()?.Description};
            }
        }


        private string GenerateToken(ApplicationUser user, IList<string> roles)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            Configuration = builder.Build();

            var someClaims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.NameId, user.Id)
            };

            foreach (var role in roles) someClaims.Add(new Claim(ClaimTypes.Role, role));

            SecurityKey securityKey =
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtOptions:SecurityKey"]));

            var token = new JwtSecurityToken(
                Configuration["JwtOptions:Issuer"],
                Configuration["JwtOptions:Audience"],
                someClaims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}