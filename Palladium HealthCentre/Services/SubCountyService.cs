using Dapper;
using Palladium.HealthCentre.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Palladium.HealthCentre.Services
{
    public class SubCountyService : BaseService, IService<SubCounty>
    {
        public SubCountyService(string connectionString) : base(connectionString)
        {
        }

        public void Delete(long id)
        {
            var subCounty = GetById(id);
            string sql = $"UPDATE TABLE sub_county SET deleted_at=@DeletedAt WHERE id=@Id";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, subCounty);
            }
        }

        public List<SubCounty> GetAll()
        {
            string sql = $"SELECT id, county_id, name, created_at AS createdAt, updated_at AS updatedAt, deleted_at AS deletedAt " +
                $"FROM sub_county WHERE deleted_at IS NULL";
            using (var connection = GetConnection())
            {
                connection.Open();
                var counties = connection.Query<SubCounty>(sql).AsList();
                return counties;
            }
        }

        public SubCounty GetById(long id)
        {
            string sql = $"SELECT id, county_id AS countyId, name, created_at AS createdAt, updated_at AS updatedAt, deleted_at AS deletedAt " +
                $"FROM sub_county WHERE id={id} AND deleted_at IS NULL";
            using (var connection = GetConnection())
            {
                connection.Open();
                var subCounty = connection.Query<SubCounty>(sql).SingleOrDefault();
                return subCounty;
            }
        }

        public void Save(SubCounty subCounty)
        {
            string sql = $"INSERT INTO sub_county(name, county_id) VALUES(@Name, @CountyId)";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, subCounty);
            }
        }

        public void Update(SubCounty subCounty)
        {
            string sql = $"UPDATE sub_county SET name = @Name, county_id=@CountyId WHERE id=@Id";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, subCounty);
            }
        }
    }
}
