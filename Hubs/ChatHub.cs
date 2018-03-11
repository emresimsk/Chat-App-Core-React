using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace ChatAppCoreReact.Hubs
{
    public class ChatHub : Hub
    {
        public Task SendMessage(string message,string token)
        {
            return Clients.All.InvokeAsync("GetMessage", message, DateTime.Now,token);
        }
    }
}
