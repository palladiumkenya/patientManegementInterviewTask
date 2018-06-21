using System;

namespace Palladium.HealthCentre.Models
{
    public abstract class BaseModel
    {
        public long Id { get; set; }

        public DateTime CreatedAt{ get; set; }

        public DateTime? UpdatedAt { get; set; }

        public DateTime? DeletedAt { get; set; }
    }
}
