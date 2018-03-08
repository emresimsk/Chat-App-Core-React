using System;
using System.Collections.Generic;

namespace ChatAppCoreReact.ContextModel
{
    public partial class SharedChat
    {
        public int Id { get; set; }
        public string Sender { get; set; }
        public string Message { get; set; }
        public DateTime? Date { get; set; }
    }
}
