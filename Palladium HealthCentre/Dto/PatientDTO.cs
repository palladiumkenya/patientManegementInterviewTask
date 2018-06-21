using System;

namespace Palladium.HealthCentre.Dto
{
    public class PatientDTO
    {
        public string EnrollmentNo { get; set; }

        public DateTime EnrollmentDate { get; set; }

        public DateTime? DischargeDate { get; set; }

        public string FirstName { get; set; }

        public string surname { get; set; }

        public string middleName { get; set; }

        public DateTime Dob { get; set; }

        public string nationalId { get; set; }

        public int Age { get; set; }
    }
}
