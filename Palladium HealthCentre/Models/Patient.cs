using System;

namespace Palladium.HealthCentre.Models
{
    public class Patient :BaseModel
    {
        public long EnrollmentNo { get; set; }

        public DateTime EnrollmentDate  { get; set; }

        public DateTime DischargeDate { get; set; }

        public long BioDataId { get; set; }
    }
}
