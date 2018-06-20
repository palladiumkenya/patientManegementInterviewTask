using System;

namespace Palladium.HealthCentre.Models
{
    public class Enrollment :BaseModel
    {
        public long EnrollmentNo { get; set; }

        public DateTime EnrollmentDate  { get; set; }

        public long BioDataId { get; set; }
    }
}
