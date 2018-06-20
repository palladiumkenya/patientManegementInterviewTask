using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PHS.ViewModels
{
    public class VVillages
    {
        public int? ID { get; set; }
        public int? Villageid { get; set; }
        public string Village { get; set; }
        public int Countyid { get; set; }
        public int Subcountyid { get; set; }
        public int Wardid { get; set; }
        public int Patientid { get; set; }
    }
}