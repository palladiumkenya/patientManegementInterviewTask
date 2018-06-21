using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Palladium.HealthCentre.Connection;
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
    public class WardController : BaseController
    {
        public WardController(IOptions<DatabaseSettings> dbSettings) : base(dbSettings)
        {
        }

        private WardService WardService
        {
            get
            {
                return new WardService(DbSettings.DefaultConnection);
            }
        }

        // GET api/values
        [HttpGet]
        public Result<List<Ward>> Get(long countyId, int id = -1)
        {
            if (id <= 0)
            {
                var wards = WardService.GetAllByParentId(countyId);
                return GetSuccessResponse(wards);
            }
            else
            {
                var wards = WardService.GetByParentId(countyId, id);
                return GetSuccessResponse(wards);
            }
        }

        // POST api/values
        [HttpPost]
        public Result<object> Post([FromBody]Ward ward)
        {
            WardService.Save(ward);
            return GetSuccessResponse(new object());
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public Result<object> Put(long id, [FromBody]Ward ward)
        {
            ward.Id = id;
            WardService.Update(ward);
            return GetSuccessResponse(new object());
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public Result<object> Delete(long id)
        {
            WardService.Delete(id);
            return GetSuccessResponse(new object());
        }
    }
}
