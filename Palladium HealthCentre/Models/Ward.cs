using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Palladium.HealthCentre.Models
{
    public class Ward : BaseModel
    {
        public string name { get; set; }

        public long SubCountyId { get; set; }
    }
}
