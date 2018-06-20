using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Palladium.HealthCentre.Services
{
    public abstract class BaseService
    {
        private string _connectionString;

        protected BaseService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IDbConnection GetConnection()
        {
            try
            {
                var conn = new NpgsqlConnection(_connectionString);
                return conn;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
