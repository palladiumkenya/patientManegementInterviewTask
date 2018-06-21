using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Palladium.HealthCentre.Connection;
using Palladium.HealthCentre.Models;
using Palladium.HealthCentre.Responses;
using Palladium.HealthCentre.Services;
using Palladium.HealthCentre.Settings;
using System.Collections.Generic;

namespace Palladium.HealthCentre.Controllers
{
    public class CountyController : BaseController
    {
        public CountyController(IOptions<DatabaseSettings> dbSettings) : base(dbSettings)
        {
        }
        // GET api/values
        [HttpGet]
        public Result<List<County>> Get()
        {
            var countyService = new CountyService(DbSettings.DefaultConnection);
            var counties = countyService.GetAll();
            return GetSuccessResponse(counties);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Result<County> Get(int id)
        {
            var countyService = new CountyService(DbSettings.DefaultConnection);
            var county = countyService.GetById(id);
            return GetSuccessResponse(county);
        }

        // POST api/values
        [HttpPost]
        public Result<object> Post([FromBody]County county)
        {
            var countyService = new CountyService(DbSettings.DefaultConnection);
            countyService.Save(county);
            return GetSuccessResponse(new object());
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public Result<object> Put(long id, [FromBody]County county)
        {
            county.Id = id;
            var countyService = new CountyService(DbSettings.DefaultConnection);
            countyService.Update(county);
            return GetSuccessResponse(new object());
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public Result<object> Delete(long id)
        {
            var countyService = new CountyService(DbSettings.DefaultConnection);
            countyService.Delete(id);
            return GetSuccessResponse(new object());
        }
    }
}
