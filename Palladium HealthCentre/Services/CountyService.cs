using Dapper;
using Palladium.HealthCentre.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Palladium.HealthCentre.Services
{
    public class CountyService : BaseService, IService<County>
    {
        public CountyService(string connectionString) : base(connectionString)
        {
        }

        public void Delete(long id)
        {
            var county = GetById(id);
            string sql = "UPDATE TABLE county SET deleted_at=@DeletedAt";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, county);
            }
        }

        public List<County> GetAll()
        {
            string sql = $"SELECT id, name, created_at AS createdAt, updated_at AS updatedAt, deleted_at AS deletedAt " +
                $"FROM county WHERE deleted_at IS NULL";
            using (var connection = GetConnection())
            {
                connection.Open();
                var counties = connection.Query<County>(sql).AsList();
                return counties;
            }
        }

        public County GetById(long id)
        {
            string sql = $"SELECT id, name, created_at AS createdAt, updated_at AS updatedAt, deleted_at AS deletedAt " +
                $"FROM county WHERE id = {id} AND deleted_at IS NULL";
            using (var connection = GetConnection())
            {
                connection.Open();
                var county = connection.Query<County>(sql).SingleOrDefault();
                return county;
            }
        }

        public void Save(County county)
        {
            string sql = $"INSERT INTO county(name) VALUES(@Name)";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, county);
            }
        }

        public void Update(County county)
        {
            string sql = "UPDATE TABLE county SET name = @Name, updated_at = @UpdatedAt WHERE id=@Id";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, county);
            }
        }
    }
}
