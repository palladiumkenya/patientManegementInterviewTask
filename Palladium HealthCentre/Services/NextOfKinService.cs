using Dapper;
using Palladium.HealthCentre.Models;
using System;
using System.Collections.Generic;

namespace Palladium.HealthCentre.Services
{
    public class NextOfKinService : BaseService, IService<NextOfKin>
    {
        public NextOfKinService(string connectionString) : base(connectionString)
        {
        }

        public void Delete(long id)
        {
            var ward = GetById(id);

            string sql = $"UPDATE next_of_kin SET deleted_at=@DeletedAt WHERE id=@Id";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, ward);
            }
        }

        public List<NextOfKin> GetAll(long id = -1)
        {
            throw new NotImplementedException();
        }

        public NextOfKin GetById(long id)
        {
            throw new NotImplementedException();
        }

        public void Save(NextOfKin obj)
        {
            throw new NotImplementedException();
        }

        public void Update(NextOfKin obj)
        {
            throw new NotImplementedException();
        }
    }
}
