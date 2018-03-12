using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using ChatAppCoreReact.Controllers.Api;
using ChatAppCoreReact.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Sockets.Client;
using Microsoft.AspNetCore.Sockets.Features;
using Newtonsoft.Json;

namespace ChatAppCoreReact.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessageAll(string message, string id, string token)
        {
            var time = DateTime.Now;
            saveMessage(message, token, time);
            await Clients.All.InvokeAsync("GetMessageAll", message, time, id);
        }

        private static void saveMessage(string message, string token, DateTime time)
        {

            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://localhost:64055/Api/Operations/SendMessageAll");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";
            httpWebRequest.Headers.Add("Authorization", "Bearer " + token);

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = JsonConvert.SerializeObject(new SendMessageModel() {Message = message, Time = time});

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
        }
    }
}
