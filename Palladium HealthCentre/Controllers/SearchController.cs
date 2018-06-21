using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Palladium.HealthCentre.Connection;
using Palladium.HealthCentre.Dto;
using Palladium.HealthCentre.Responses;
using Palladium.HealthCentre.Services;
using Palladium.HealthCentre.Settings;
using System.Collections.Generic;

namespace Palladium.HealthCentre.Controllers
{
    public class SearchController : BaseController
    {
        public SearchController(IOptions<DatabaseSettings> dbSettings) : base(dbSettings)
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
        public Result<List<PatientDTO>> Get(int age, bool deleted = false)
        {
            var bios = PatientService.Search(age);
            if (deleted)
            {
                bios = PatientService.GetDeletedPatients();
            }

            return GetSuccessResponse(bios);
        }
    }
}
