namespace Palladium.HealthCentre.Models
{
    public class Contact : BaseModel
    {
        public string CellPhone { get; set; }

        public string AlternativeCellPhone { get; set; }

        public string Email { get; set; }

        public long  BioDataId { get; set; }
    }
}
