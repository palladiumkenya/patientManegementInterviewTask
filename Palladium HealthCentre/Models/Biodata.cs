using System;

namespace Palladium.HealthCentre.Models
{
    public class BioData : BaseModel
    {
        public string FirstName { get; set; }

        public string Surname { get; set; }

        public string MiddleName { get; set; }

        public DateTime Dob { get; set; }

        public string NationalId { get; set; }
    }
}
