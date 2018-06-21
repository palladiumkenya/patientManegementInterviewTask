using Dapper;
using Palladium.HealthCentre.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Palladium.HealthCentre.Services
{
    public class ContactService : BaseService, IService<Contact>
    {
        public ContactService(string connectionString) : base(connectionString)
        {
        }

        public void Delete(long id)
        {
            var ward = GetById(id);
            string sql = $"UPDATE TABLE contact SET deleted_at=@DeletedAt WHERE id=@Id";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, ward);
            }
        }

        public List<Contact> GetAll(long parentId = -1)
        {
            string sql = $"SELECT id, cell_phone AS cellPhone, alternative_cell_phone AS AlternativeCellPhone, " +
                "email, bio_data_id AS BioDataId, created_at AS createdAt, updated_at AS updatedAt, deleted_at AS deletedAt  FROM contact";
            using (var connection = GetConnection())
            {
                connection.Open();
                var contact = connection.Query<Contact>(sql).AsList();
                return contact;
            }
        }

        public Contact GetById(long id)
        {
            string sql = $"SELECT id, cell_phone AS cellPhone, alternative_cell_phone AS AlternativeCellPhone, " +
                $"email, bio_data_id AS BioDataId, created_at AS createdAt, updated_at AS updatedAt, " +
                $"deleted_at AS deletedAt  FROM contact WHERE id={id} AND deleted_at IS NULL";
            using (var connection = GetConnection())
            {
                connection.Open();
                var contact = connection.Query<Contact>(sql).SingleOrDefault();
                return contact;
            }
        }

        public void Save(Contact contact)
        {
            string sql = $"INSERT INTO contact(cell_phone, alternative_cell_phone, email, bio_data_id) " +
                $"VALUES(@CellPhone, @AlternativeCellPhone, @Email, @BioDataId)";
            using (var connection = GetConnection())
            {
                connection.Open();
                var ward = connection.Execute(sql, contact);
            }
        }

        public void Update(Contact contact)
        {
            string sql = $"UPDATE contact SET cell_phone=@CellPhone, alternative_cell_phone=@AlternativeCellPhone, email=@Email, bio_data_id=@BioDataId, updated_at=@UpdatedAt WHERE id=@Id";
            using (var connection = GetConnection())
            {
                connection.Open();
                var ward = connection.Execute(sql, contact);
            }
        }
    }
}
