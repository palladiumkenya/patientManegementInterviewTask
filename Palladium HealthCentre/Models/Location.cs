using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Palladium.HealthCentre.Models
{
    public class Location : BaseModel
    {
        public long CountyId { get; set; }

        public long SubCountyId { get; set; }

        public long WardId { get; set; }

        public long BioDataId { get; set; }
    }
}
