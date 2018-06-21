using Dapper;
using Palladium.HealthCentre.Models;
using System.Collections.Generic;
using System.Linq;

namespace Palladium.HealthCentre.Services
{
    public class EnrollmentService : BaseService, IService<Enrollment>
    {
        public EnrollmentService(string connectionString) : base(connectionString)
        {
        }

        public void Delete(long id)
        {
            var ward = GetById(id);
            string sql = $"UPDATE TABLE enrollment SET deleted_at=@DeletedAt WHERE id=@Id";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, ward);
            }
        }

        public List<Enrollment> GetAll()
        {
            string sql = $"SELECT enrollment_no AS enrollmentNo, enrollment_date AS enrollmentDate, bio_data_id AS bioDataId,created_at AS createdAt, " +
                $"updated_at AS updatedAt, deleted_at AS deletedAt FROM enrollment WHERE deleted_at IS NULL";
            using (var connection = GetConnection())
            {
                connection.Open();
                var enrollments = connection.Query<Enrollment>(sql).AsList();
                return enrollments;
            }
        }

        public Enrollment GetById(long id)
        {
            string sql = $"SELECT enrollment_no AS enrollmentNo, enrollment_date AS enrollmentDate, bio_data_id AS bioDataId,created_at AS createdAt, " +
                $"updated_at AS updatedAt, deleted_at AS deletedAt FROM enrollment WHERE id={id} AND deleted_at IS NULL";
            using (var connection = GetConnection())
            {
                connection.Open();
                var enrollment = connection.Query<Enrollment>(sql).SingleOrDefault();
                return enrollment;
            }
        }

        public void Save(Enrollment enrollment)
        {
            string sql = $"INSERT INTO enrollment(enrollment_no, enrollment_date, bio_data_id) " +
                 $"VALUES(@EnrollmentNo, @EnrollmentDate, @BioDataId)";
            using (var connection = GetConnection())
            {
                connection.Open();
                var ward = connection.Execute(sql, enrollment);
            }
        }

        public void Update(Enrollment enrollment)
        {
            string sql = $"UPDATE enrollment SET enrollment_no=@EnrollmentNo, enrollment_date=@EnrollmentDate, bio_data_id=@BioDataId WHERE id=@Id";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, enrollment);
            }
        }
    }
}
