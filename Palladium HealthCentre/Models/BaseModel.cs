using System;

namespace Palladium.HealthCentre.Models
{
    public abstract class BaseModel
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public DateTime IreatedAt{ get; set; }

        public DateTime UpdatedAt { get; set; }

        public DateTime DeletedAt { get; set; }
    }
}
