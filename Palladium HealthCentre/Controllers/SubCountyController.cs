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
    public class SubCountyController : BaseController
    {
        public SubCountyController(IOptions<DatabaseSettings> dbSettings) : base(dbSettings)
        {
        }

        private SubCountyService ScService
        {
            get
            {
                return new SubCountyService(DbSettings.DefaultConnection);
            }
        }

        // GET api/values
        [HttpGet]
        public Result<List<SubCounty>> Get(long countyId, int id = -1)
        {
            if (id <= 0)
            {
                var subCounties = ScService.GetAllByParentId(countyId);
                return GetSuccessResponse(subCounties);
            }
            else
            {
                var subCounties = ScService.GetByParentId(countyId, id);
                return GetSuccessResponse(subCounties);
            }
        }

        // POST api/values
        [HttpPost]
        public Result<object> Post([FromBody]SubCounty subCounty)
        {
            ScService.Save(subCounty);
            return GetSuccessResponse(new object());
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public Result<object> Put(long id, [FromBody]SubCounty subCounty)
        {
            subCounty.Id = id;
            ScService.Update(subCounty);
            return GetSuccessResponse(new object());
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public Result<object> Delete(long id)
        {
            ScService.Delete(id);
            return GetSuccessResponse(new object());
        }
    }
}
