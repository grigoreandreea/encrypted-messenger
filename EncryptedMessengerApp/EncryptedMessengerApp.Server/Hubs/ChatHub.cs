using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System;
using System.Net.Http;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EncryptedMessengerApp.Server.Hubs
{
    public class ChatHub : Hub
    {
        private readonly string ApiURL = "http://localhost:62421/api/Messages";
        private readonly HttpClient client = new HttpClient();
        public async Task SendMessage(int idUserSent, int? idUserReceived, int? idGroupReceived, string content, DateTime sentDate)
        {
            await Clients.All.SendAsync("ReceiveMessage", idUserSent, idUserReceived, idGroupReceived, content, sentDate);

            Dictionary<string, string> values = new Dictionary<string, string>();
            values.Add("IdUserSent", idUserSent.ToString());
            values.Add("IdUserReceived", idUserReceived.HasValue ? idUserReceived.ToString() : null);
            values.Add("IdGroupReceived", idGroupReceived.HasValue ? idGroupReceived.ToString() : null);
            values.Add("Content", content);
            values.Add("SentDate", sentDate.ToString("yyyy-MM-dd hh:mm:ss"));

            string message = "{";
            message += values.Select(d => string.Format("\"{0}\": {1}", d.Key, string.Join(",", d.Value)));
            message += "}";

            HttpContent httpContent = new StringContent(message, Encoding.UTF8, "application/json");
            await client.PostAsync(ApiURL, httpContent);

        }
    }
}
