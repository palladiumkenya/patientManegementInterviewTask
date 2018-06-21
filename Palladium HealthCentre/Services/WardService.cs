using Dapper;
using Palladium.HealthCentre.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Palladium.HealthCentre.Services
{
    public class WardService : BaseService, IService<Ward>
    {
        public WardService(string connectionString) : base(connectionString)
        {
        }

        public void Delete(long id)
        {
            var ward = GetById(id);
            ward.DeletedAt = DateTime.Now;
            string sql = $"UPDATE TABLE ward SET deleted_at=@DeletedAt WHERE id=@Id";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, ward);
            }
        }

        public List<Ward> GetAll(long parentId = -1)
        {
            string sql = $"SELECT id, sub_county_id, name, created_at AS createdAt, updated_at AS updatedAt, deleted_at AS deletedAt " +
                $"FROM ward WHERE deleted_at IS NULL";
            using (var connection = GetConnection())
            {
                connection.Open();
                var counties = connection.Query<Ward>(sql).AsList();
                return counties;
            }
        }

        internal List<Ward> GetByParentId(long subCountyid, int id)
        {
            throw new NotImplementedException();
        }

        internal List<Ward> GetAllByParentId(long countyId)
        {
            throw new NotImplementedException();
        }

        public Ward GetById(long id)
        {
            string sql = $"SELECT id, sub_county_id, name, created_at AS createdAt, updated_at AS updatedAt, deleted_at AS deletedAt " +
                $"FROM ward WHERE id={id} AND deleted_at IS NULL";
            using (var connection = GetConnection())
            {
                connection.Open();
                var ward = connection.Query<Ward>(sql).SingleOrDefault();
                return ward;
            }
        }

        public void Save(Ward obj)
        {
            string sql = $"INSERT INTO ward(sub_county_id, name) VALUES(@SubCountyId, @Name)";
            using (var connection = GetConnection())
            {
                connection.Open();
                var ward = connection.Execute(sql, obj);
            }
        }

        public void Update(Ward ward)
        {
            string sql = $"UPDATE ward SET name=@Name, sub_county_id=@SubCountyId, updated_at=@UpdatedAt WHERE id=@Id";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, ward);
            }
        }
    }
}
