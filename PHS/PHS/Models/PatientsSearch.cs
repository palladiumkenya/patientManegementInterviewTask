using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PHS.Models
{
    public class PatientsSearch
    {
        public string Name { get; set; }
        public string Cellphone { get; set; }
        public string Enrollmentnumber { get; set; }
        public string Enrollmentdate { get; set; }
        public int Type { get; set; }
    }
}