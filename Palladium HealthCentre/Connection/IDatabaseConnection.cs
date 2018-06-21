using System.Data;

namespace Palladium.HealthCentre.Connection
{
    internal interface IDatabaseConnection
    {
        IDbConnection GetConnection(string connectionString);
    }
}
