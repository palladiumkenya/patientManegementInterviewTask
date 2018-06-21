using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Palladium.HealthCentre.Connection;
using Palladium.HealthCentre.Models;
using Palladium.HealthCentre.Responses;
using Palladium.HealthCentre.Settings;
using System.Collections.Generic;

namespace Palladium.HealthCentre.Controllers
{
    public class LocationController : BaseController
    {
        public LocationController(IOptions<DatabaseSettings> dbSettings) : base(dbSettings)
        {
        }

        private LocationService LocationService
        {
            get
            {
                return new LocationService(DbSettings.DefaultConnection);
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Result<List<Location>> Get(int id)
        {
            var county = LocationService.GetByBioDataId(id);
            return GetSuccessResponse(county);
        }

        // POST api/values
        [HttpPost]
        public Result<object> Post([FromBody]Location location)
        {
            LocationService.Save(location);
            return GetSuccessResponse(new object());
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public Result<object> Put(long id, [FromBody]Location location)
        {
            location.Id = id;
            LocationService.Update(location);
            return GetSuccessResponse(new object());
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public Result<object> Delete(long id)
        {
            LocationService.Delete(id);
            return GetSuccessResponse(new object());
        }
    }
}
