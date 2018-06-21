using Dapper;
using Palladium.HealthCentre.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Palladium.HealthCentre.Models
{
    public class LocationService : BaseService, IService<Location>
    {
        public LocationService(string connectionString) : base(connectionString)
        {
        }

        public void Delete(long id)
        {
            var ward = GetById(id);
            string sql = $"UPDATE TABLE location SET deleted_at=@DeletedAt WHERE id=@Id";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, ward);
            }
        }

        public List<Location> GetAll(long id = -1)
        {
            throw new NotImplementedException();
        }

        public List<Location> GetByBioDataId(long id)
        {
            string sql = $"SELECT id,county_id AS countyId,sub_county_id AS subCountyId,ward_id AS wardId,bio_data_id AS BioDataId, " +
                $"created_at AS createdAt, updated_at AS updatedAt, deleted_at AS deletedAt FROM location WHERE bio_data_id={id} AND deleted_at IS NULL";
            using (var connection = GetConnection())
            {
                connection.Open();
                var locations = connection.Query<Location>(sql).AsList();
                return locations;
            }
        }

        public Location GetById(long id)
        {
            string sql = $"SELECT id,county_id AS countyId,sub_county_id AS subCountyId,ward_id AS wardId,bio_data_id AS BioDataId, " +
                $"created_at AS createdAt, updated_at AS updatedAt, deleted_at AS deletedAt FROM location WHERE id={id} AND deleted_at IS NULL";
            using (var connection = GetConnection())
            {
                connection.Open();
                var location = connection.Query<Location>(sql).SingleOrDefault();
                return location;
            }
        }

        public void Save(Location location)
        {
            string sql = $"INSERT INTO location(county_id, sub_county_id, ward_id, bio_data_id) " +
                 $"VALUES(@CountyId, @SubCountyId, @WardId, @BioDataId)";
            using (var connection = GetConnection())
            {
                connection.Open();
                var ward = connection.Execute(sql, location);
            }
        }

        public void Update(Location location)
        {
            string sql = $"UPDATE location SET county_id=@CountyId, sub_county_id=@SubCountyId,ward_id=@WardId, bio_data_id=@BioDataId WHERE id=@Id";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, location);
            }
        }
    }
}
