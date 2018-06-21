using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Palladium.HealthCentre.Responses;
using Palladium.HealthCentre.Settings;

namespace Palladium.HealthCentre.Connection
{
    [Route("v1/[controller]")]
    public abstract class BaseController
    {
        public DatabaseSettings DbSettings { get; private set; }

        public BaseController(IOptions<DatabaseSettings> dbSettings)
        {
            DbSettings = dbSettings.Value;
        }

        public Result<T> GetSuccessResponse<T>(T obj)
        {
            return new Result<T>
            {
                ResultCode  = ResultCode.SUCCESS,
                Message = "Success",
                Content = obj
            };
        }
    }
}
