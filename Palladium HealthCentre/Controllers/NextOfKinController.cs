using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Palladium.HealthCentre.Connection;
using Palladium.HealthCentre.Dto;
using Palladium.HealthCentre.Models;
using Palladium.HealthCentre.Responses;
using Palladium.HealthCentre.Services;
using Palladium.HealthCentre.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Palladium.HealthCentre.Controllers
{
    public class NextOfKinController : BaseController
    {
        public NextOfKinController(IOptions<DatabaseSettings> dbSettings) : base(dbSettings)
        {
        }

        private NextOfKinService KinService
        {
            get
            {
                return new NextOfKinService(DbSettings.DefaultConnection);
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Result<List<PersonDTO>> Get(int id)
        {
            var nextOfKins = KinService.GetNextOfKin(id);
            return GetSuccessResponse(nextOfKins);
        }

        // POST api/values
        [HttpPost]
        public Result<object> Post([FromBody]NextOfKin next)
        {
            KinService.Save(next);
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
