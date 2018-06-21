namespace Palladium.HealthCentre.Responses
{
    public class Result<T>
    {
        public string Message { get; set; }

        public ResultCode ResultCode { get; set; }

        public T Content { get; set; }
    }
}
