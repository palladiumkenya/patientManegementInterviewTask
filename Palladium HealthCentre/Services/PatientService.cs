using Dapper;
using Palladium.HealthCentre.Dto;
using Palladium.HealthCentre.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Palladium.HealthCentre.Services
{
    public class PatientService : BaseService, IService<Patient>
    {
        public PatientService(string connectionString) : base(connectionString)
        {
        }

        public void Delete(long id)
        {
            var enroll = GetById(id);
            enroll.DeletedAt = DateTime.Now;

            string sql = $"UPDATE enrollment SET deleted_at=@DeletedAt WHERE id=@Id";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, enroll);
            }
        }

        public List<PatientDTO> GetAll()
        {
            string sql = $"SELECT enrollment_no As enrollmentNo,enrollment_date AS enrollmentDate," +
                $"discharge_date AS dischargeDate,first_name AS firstName,surname, middle_name AS middleName, " +
                $"dob, national_id AS nationalId,(DATE_PART('year', NOW()) - DATE_PART('year', dob)) age " +
                $"FROM enrollment e INNER JOIN biodata b ON e.bio_data_id = b.id";

            using (var connection = GetConnection())
            {
                connection.Open();
                var patients = connection.Query<PatientDTO>(sql).AsList();
                return patients;
            }
        }

        internal List<PatientDTO> GetDeletedPatients()
        {
            string sql = $"SELECT enrollment_no As enrollmentNo,enrollment_date AS enrollmentDate," +
                $"discharge_date AS dischargeDate,first_name AS firstName,surname, middle_name AS middleName, " +
                $"dob, national_id AS nationalId,(DATE_PART('year', NOW()) - DATE_PART('year', dob)) age " +
                $"FROM enrollment e INNER JOIN biodata b ON e.bio_data_id = b.id WHERE e.deleted_at != null";

            using (var connection = GetConnection())
            {
                connection.Open();
                var patients = connection.Query<PatientDTO>(sql).AsList();
                return patients;
            }
        }

        internal List<PatientDTO> Search(int age)
        {
            string sql = $"SELECT enrollment_no As enrollmentNo,enrollment_date AS enrollmentDate," +
                $"discharge_date AS dischargeDate,first_name AS firstName,surname, middle_name AS middleName, " +
                $"dob, national_id AS nationalId,(DATE_PART('year', NOW()) - DATE_PART('year', dob)) age " +
                $"FROM enrollment e INNER JOIN biodata b ON e.bio_data_id = b.id WHERE (DATE_PART('year', NOW()) - DATE_PART('year', dob)) < {age} AND e.enrollment_no IS NULL";

            using (var connection = GetConnection())
            {
                connection.Open();
                var patients = connection.Query<PatientDTO>(sql).AsList();
                return patients;
            }
        }

        public List<Patient> GetAll(long parentId)
        {
            string sql = $"SELECT enrollment_no AS enrollmentNo, enrollment_date AS enrollmentDate, bio_data_id AS bioDataId,created_at AS createdAt, " +
                $"updated_at AS updatedAt, deleted_at AS deletedAt FROM enrollment WHERE deleted_at IS NULL";
            using (var connection = GetConnection())
            {
                connection.Open();
                var enrollments = connection.Query<Patient>(sql).AsList();
                return enrollments;
            }
        }

        public Patient GetById(long id)
        {
            string sql = $"SELECT enrollment_no AS enrollmentNo, enrollment_date AS enrollmentDate, bio_data_id AS bioDataId,created_at AS createdAt, " +
                $"updated_at AS updatedAt, deleted_at AS deletedAt FROM enrollment WHERE id={id} AND deleted_at IS NULL";
            using (var connection = GetConnection())
            {
                connection.Open();
                var enrollment = connection.Query<Patient>(sql).SingleOrDefault();
                return enrollment;
            }
        }

        public void Save(Patient enrollment)
        {
            string sql = $"INSERT INTO enrollment(enrollment_date, bio_data_id) " +
                 $"VALUES(@EnrollmentDate, @BioDataId)";
            using (var connection = GetConnection())
            {
                connection.Open();
                connection.Execute(sql, enrollment);
            }
        }

        public void Update(Patient enrollment)
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
