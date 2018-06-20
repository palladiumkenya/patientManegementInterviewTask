using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Palladium.HealthCentre.Connection;
using Palladium.HealthCentre.Models;
using Palladium.HealthCentre.Responses;
using Palladium.HealthCentre.Settings;

namespace Palladium.HealthCentre.Controllers
{
    [Route("api/[controller]")]
    public class BioDaataController : BaseController
    {
        public BioDaataController(IOptions<DatabaseSettings> dbSettings) : base(dbSettings)
        {
        }

        // GET api/values
        [HttpGet]
        public Result<List<BioData>>  Get()
        {
            return null;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Result<BioData> Get(int id)
        {
            return null;
        }

        // POST api/values
        [HttpPost]
        public Result<BioData> Post([FromBody]BioData biodata)
        {
            return null;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public Result<BioData> Put(int id, [FromBody]BioData biodata)
        {
            return null;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public Result<BioData> Delete(int id)
        {
            return null;
        }
    }
}
