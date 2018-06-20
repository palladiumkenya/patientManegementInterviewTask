using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PHS.ViewModels
{
    public class VAuditTrails
    {
        public int ID { get; set; }
        public int RecordID { get; set; }
        public string Record { get; set; }
        public string RecordTable { get; set; }
        public string Action { get; set; }
        public int ActionBy { get; set; }
        public DateTime ActionDate { get; set; }
    }
}