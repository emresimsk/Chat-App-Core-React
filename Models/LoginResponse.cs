using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAppCoreReact.Models
{
    public class LoginResponse
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public string TokenResult { get; set; }
    }
}
