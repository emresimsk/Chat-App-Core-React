using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatAppCoreReact.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatAppCoreReact.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Operations/[action]")]
    public class OperationsController : Controller
    {
        public int Send([FromBody] SendMessageModel info)
        {
            return 1;
        }
    }
}