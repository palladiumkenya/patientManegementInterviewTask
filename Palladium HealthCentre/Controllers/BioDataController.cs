using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Palladium.HealthCentre.Connection;
using Palladium.HealthCentre.Models;
using Palladium.HealthCentre.Responses;
using Palladium.HealthCentre.Services;
using Palladium.HealthCentre.Settings;

namespace Palladium.HealthCentre.Controllers
{
    [Route("v1/[controller]")]
    public class BioDataController : BaseController
    {
        public BioDataController(IOptions<DatabaseSettings> dbSettings) : base(dbSettings)
        {
        }

        // GET api/values
        [HttpGet]
        public Result<List<BioData>>  Get()
        {
            var bioService = new BioDataService(DbSettings.DefaultConnection);
            var bios = bioService.GetAll();
            return GetSuccessResponse(bios);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Result<BioData> Get(int id)
        {
            var bioService = new BioDataService(DbSettings.DefaultConnection);
            var bio = bioService.GetById(id);
            return GetSuccessResponse(bio);
        }

        // POST api/values
        [HttpPost]
        public Result<object> Post([FromBody]BioData biodata)
        {
            var bioService = new BioDataService(DbSettings.DefaultConnection);
            bioService.Save(biodata);
            return GetSuccessResponse(new object());
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public Result<object> Put(long id, [FromBody]BioData biodata)
        {
            biodata.Id = id;
            var bioService = new BioDataService(DbSettings.DefaultConnection);
            bioService.Update(biodata);
            return GetSuccessResponse(new object());
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public Result<object> Delete(long id)
        {
            var bioService = new BioDataService(DbSettings.DefaultConnection);
            bioService.Delete(id);
            return GetSuccessResponse(new object());
        }
    }
}
