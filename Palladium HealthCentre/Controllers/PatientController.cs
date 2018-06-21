using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Palladium.HealthCentre.Connection;
using Palladium.HealthCentre.Dto;
using Palladium.HealthCentre.Models;
using Palladium.HealthCentre.Responses;
using Palladium.HealthCentre.Services;
using Palladium.HealthCentre.Settings;
using System.Collections.Generic;

namespace Palladium.HealthCentre.Controllers
{
    public class PatientController : BaseController
    {
        public PatientController(IOptions<DatabaseSettings> dbSettings) : base(dbSettings)
        {
        }

        private PatientService PatientService
        {
            get
            {
                return new PatientService(DbSettings.DefaultConnection);
            }
        }


        // GET api/values
        [HttpGet]
        public Result<List<PatientDTO>> Get()
        {
            var bios = PatientService.GetAll();
            return GetSuccessResponse(bios);
        }

        // POST api/values
        [HttpPost]
        public Result<object> Post([FromBody]Patient patient)
        {
            PatientService.Save(patient);
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
