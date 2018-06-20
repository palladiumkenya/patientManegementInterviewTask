using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PHS.ViewModels
{
    public class VPatients
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Surname { get; set; }
        public string Othernames { get; set; }
        public string Gender { get; set; }
        public DateTime? DOB { get; set; }
        public int? Occupationid { get; set; }
        public string Occupation { get; set; }
        //public string Cellphone { get; set; }
        //public string Cellphone2 { get; set; }
        //public string Email { get; set; }
        public DateTime? Enrollmentdate { get; set; }
        public string Enrollmentnumber { get; set; }

        public string Type { get; set; }
        public DateTime? Actiondate { get; set; }
    }
}