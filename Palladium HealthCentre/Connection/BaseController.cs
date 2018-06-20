using Microsoft.Extensions.Options;
using Palladium.HealthCentre.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Palladium.HealthCentre.Connection
{
    public abstract class BaseController
    {
        public DatabaseSettings DbSettings { get; private set; }

        public BaseController(IOptions<DatabaseSettings> dbSettings)
        {
            DbSettings = dbSettings.Value;
        }

    }
}
