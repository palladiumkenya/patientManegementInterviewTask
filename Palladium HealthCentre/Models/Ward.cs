namespace Palladium.HealthCentre.Models
{
    public class Ward : BaseModel
    {
        public string Name { get; set; }

        public long SubCountyId { get; set; }
    }
}
