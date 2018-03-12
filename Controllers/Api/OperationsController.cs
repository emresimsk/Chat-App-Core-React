using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ChatAppCoreReact.ContextModel;
using ChatAppCoreReact.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace ChatAppCoreReact.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Operations/[action]")]
    [Authorize]
    public class OperationsController : Controller
    {
        
        MesajAppContext db = new MesajAppContext();
        public static IConfiguration Configuration { get; set; }

        [HttpPost]
        public async Task SendMessageAll([FromBody] SendMessageModel info)
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;

            db.SharedChat.Add(new SharedChat() {Message = info.Message, Date = info.Time, Sender = userId});
            await db.SaveChangesAsync();
        }

        [HttpGet]
        public List<Dictionary<string, object>> GetAllMessages()
        {
            foreach (var claim in HttpContext.User.Claims)
            {
                Console.WriteLine("Claim Type: {0}:\nClaim Value:{1}\n", claim.Type, claim.Value);
            }

            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            Configuration = builder.Build();

            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(Configuration.GetConnectionString("DefaultConnection")))
            {
                using (SqlCommand cmd = new SqlCommand("Select Sender,Message,Date from SharedChat", con))
                {
                    con.Open();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);
                    List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
                    Dictionary<string, object> row;
                    foreach (DataRow dr in dt.Rows)
                    {
                        row = new Dictionary<string, object>();
                        foreach (DataColumn col in dt.Columns)
                        {
                            row.Add(col.ColumnName, dr[col]);
                        }
                        rows.Add(row);
                    }

                    return rows;
                }
            }
        }
    }
}