using Dapper;
using Palladium.HealthCentre.Dto;
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

        public List<PersonDTO> GetNextOfKin(long bioDataId)
        {
            string sql = $"SELECT b.id, b.first_name AS firstName, b.surname, b.middle_name AS middleName, b.dob, " +
                $"c.cell_phone AS cellPhone, c.alternative_cell_phone AS AlternativeCellPhone, " +
                $"c.email FROM biodata b LEFT JOIN contact c ON b.id=c.bio_data_id " +
                $"WHERE b.id IN(SELECT next_of_kin_id FROM next_of_kin WHERE bio_data_id={bioDataId})";
            using (var connection = GetConnection())
            {
                connection.Open();
                var bios = connection.Query<PersonDTO>(sql).AsList();
                return bios;
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

        public void Update(NextOfKin obj)
        {
            throw new NotImplementedException();
        }

        public void Save(NextOfKin next)
        {            
            string sql = $"INSERT INTO next_of_kin(bio_data_id, next_of_kin_id) VALUES(@BioDataId, @NextOfKinId)";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, next);
            }
        }
    }
}
