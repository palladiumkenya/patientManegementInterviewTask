using Dapper;
using Palladium.HealthCentre.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Palladium.HealthCentre.Services
{
    public class BioDataService : BaseService, IService<BioData>
    {
        public BioDataService(string connectionString) : base(connectionString)
        {
        }

        public void Delete(long id)
        {
            var biodata = GetById(id);
            biodata.DeletedAt = DateTime.Now;
            string sql = $"UPDATE biodata SET deleted_at=@DeletedAt WHERE id=@Id";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, biodata);
            }
        }

        public List<BioData> GetAll(long parentId = -1)
        {
            string sql = $"SELECT id, first_name AS firstName, surname, middle_name AS middleName, dob, " +
                $"created_at AS createdAt, updated_at AS updatedAt, deleted_at AS deletedAt " +
                $"FROM biodata WHERE deleted_at IS NULL";
            using (var connection = GetConnection())
            {
                connection.Open();
                var bios =connection.Query<BioData>(sql).AsList();
                return bios;
            }
        }

        public BioData GetById(long id)
        {
            string sql = $"SELECT id, first_name AS firstName, surname, middle_name AS middleName, dob, " +
                $"created_at AS createdAt, updated_at AS updatedAt, deleted_at AS deletedAt " +
                $"FROM biodata WHERE id = {id} AND deleted_at IS NULL";
            using (var connection = GetConnection())
            {
                connection.Open();
                var biodata = connection.Query<BioData>(sql).SingleOrDefault();
                return biodata;
            }
        }

        public void Save(BioData biodata)
        {
            string sql = $@"INSERT INTO biodata(first_name, surname, middle_name, dob) VALUES(@firstName, @Surname, @MiddleName, @Dob)";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, biodata);
            }
        }

        public void Update(BioData bio)
        {
            string sql = "UPDATE biodata SET first_name = @firstName , surname=@Surname, middle_name=@MiddleName, dob=@Dob WHERE id = @Id";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, bio);
            }
        }
    }
}
