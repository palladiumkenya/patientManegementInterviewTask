using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Palladium.HealthCentre.Models
{
    public class Contact : BaseModel
    {
        public string Cell_phone { get; set; }

        public string Alternative_cell_phone { get; set; }

        public string Email { get; set; }

        public long  Bio_data_id { get; set; }
    }
}
