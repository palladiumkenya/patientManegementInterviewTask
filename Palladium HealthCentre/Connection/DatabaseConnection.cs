using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Palladium.HealthCentre.Connection
{
    public class DatabaseConnection
    {
        public IDbConnection GetConnection(string connectionString)
        {
            try
            {
                var conn = new NpgsqlConnection(connectionString);
                return conn;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
