using Microsoft.Extensions.Options;
using Palladium.HealthCentre.Connection;
using Palladium.HealthCentre.Settings;

namespace Palladium.HealthCentre.Controllers
{
    public class CountyController : BaseController
    {
        public CountyController(IOptions<DatabaseSettings> dbSettings) : base(dbSettings)
        {
        }
    }
}
