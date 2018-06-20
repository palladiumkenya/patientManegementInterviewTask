using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DAL;
using Newtonsoft.Json;
using PHS.Interfaces;
using PHS.ViewModels;

namespace PHS.Models
{
    public class Patient: BaseClass, IPatient
    {
       private PHCEntities _context;
       private IContact _contacts;
        private INok _nok;
        public Patient(PHCEntities context, IContact contacts,INok nok) : base(context)
        {
            _context = context;
            _contacts = contacts;
            _nok = nok;
        }

        public VPatients Getpatient(int id)
        {
            using (_context = new PHCEntities())
            {
                VPatients patient = new VPatients();
                var dbpatient = _context.Patients.Where(t => t.ID == id).FirstOrDefault();                
                if (dbpatient != null)
                {
                    patient.ID = dbpatient.ID;
                    patient.Title = dbpatient.Title;
                    patient.Surname = dbpatient.Surname;
                    patient.Othernames = dbpatient.OtherNames;
                    patient.Gender = dbpatient.Gender;
                    patient.DOB = dbpatient.DOB;
                    //patient.Cellphone = dbpatient.Cellphone;
                    //patient.Cellphone2 = dbpatient.Cellphone2;
                    //patient.Email = dbpatient.Email;
                    patient.Occupationid = dbpatient.OccupationID;
                    patient.Enrollmentdate = dbpatient.EnrollmentDate;
                    patient.Enrollmentnumber = dbpatient.EnrollmentNumber;
                }
                return patient;
            }

        }

        public List<VPatients> Getpatients(int id)
        {
            using (_context = new PHCEntities())
            {
                List<VPatients> patient = new List<VPatients>();
              var dbpatients=  _context.Patients.Where(t => t.ID == id);
                foreach (var dbpatient in dbpatients)
                {
                    patient.Add(new VPatients()
                    {
                        ID = dbpatient.ID,
                   Title = dbpatient.Title,
                    Surname = dbpatient.Surname,
                    Othernames = dbpatient.OtherNames,
                   Gender = dbpatient.Gender,
                    DOB = dbpatient.DOB,
                    //Cellphone = dbpatient.Cellphone,
                    //Cellphone2 = dbpatient.Cellphone2,
                    //Email = dbpatient.Email,
                    Occupationid = dbpatient.OccupationID,
                    Occupation=dbpatient.Occupations?.Occupation,
                    Enrollmentdate = dbpatient.EnrollmentDate,
                    Enrollmentnumber = dbpatient.EnrollmentNumber
                });
                   
                }
               
                return patient;
            }

        }

        public List<VPatients> Getpatients_byage(int age)
        {
            using (_context = new PHCEntities())
            {
              var d=  DateTime.Now.AddYears(-age);
                List<VPatients> patient = new List<VPatients>();
                var dbpatients = _context.Patients.Where(t => t.DOB >=d);
                foreach (var dbpatient in dbpatients)
                {
                    patient.Add(new VPatients()
                    {
                        ID = dbpatient.ID,
                        Title = dbpatient.Title,
                        Surname = dbpatient.Surname,
                        Othernames = dbpatient.OtherNames,
                        Gender = dbpatient.Gender,
                        DOB = dbpatient.DOB,                       
                        Occupationid = dbpatient.OccupationID,
                        Occupation = dbpatient.Occupations?.Occupation,
                        Enrollmentdate = dbpatient.EnrollmentDate,
                        Enrollmentnumber = dbpatient.EnrollmentNumber
                    });

                }

                return patient;
            }

        }

        public List<VPatients> Searchpatients(PatientsSearch search)
        {
            using (_context = new PHCEntities())
            {
                List<VPatients> patientslist = new List<VPatients>();

                if (search.Type==0 || search.Type==1)
                {
                    //All or patient
                    IQueryable<DAL.Patients> query = _context.Patients.Where(t => t.Active == true);

                    if (!string.IsNullOrEmpty(search.Name))
                    {
                        query = query.Where(t =>
                            t.Surname.Contains(search.Name) || t.OtherNames.Contains(search.Name));
                    }

                    if (!string.IsNullOrEmpty(search.Cellphone))
                    {
                        //query = query.Where(t =>
                        //    t.Contacts.Where(c=>c.Cellphone.Contains(search.Cellphone)));
                        //var p=  query.Where(t =>t.Contacts.Where(c => c.Cellphone.Contains(search.Cellphone)));
                        
                    }

                    if (!string.IsNullOrEmpty(search.Enrollmentnumber))
                    {
                        query = query.Where(t =>
                            t.EnrollmentNumber == search.Enrollmentnumber);
                    }

                    if (!string.IsNullOrEmpty(search.Enrollmentdate))
                    {
                        var enrollmentdate = DateTime.Parse(search.Enrollmentdate);
                        query = query.Where(t =>
                            t.EnrollmentDate == enrollmentdate);
                    }

                   // No filters limit query to particular number
                    if (string.IsNullOrEmpty(search.Name) && string.IsNullOrEmpty(search.Cellphone) && string.IsNullOrEmpty(search.Enrollmentnumber) && string.IsNullOrEmpty(search.Enrollmentdate))
                    {
                        query = query.OrderByDescending(o => o.ID).Take(10);
                    }

                    foreach (var patient in query)
                    {
                        patientslist.Add(new VPatients()
                        {
                            ID = patient.ID,
                            Title = patient.Title,
                            Surname = patient.Surname,
                            Othernames = patient.OtherNames,
                            Gender = patient.Gender,
                            DOB = patient.DOB,
                            Enrollmentdate = patient.EnrollmentDate,
                            Enrollmentnumber = patient.EnrollmentNumber,
                            Type = "Patient"
                        });

                    }
                }


                if (search.Type == 0 || search.Type == 2)
                {
                    //All or NOK
                    IQueryable<DAL.NextOfKins> query2 = _context.NextOfKins.Where(t => t.Active == true);

                    if (!string.IsNullOrEmpty(search.Name))
                    {
                        query2 = query2.Where(t =>
                            t.Surname.Contains(search.Name) || t.OtherNames.Contains(search.Name));
                    }

                    if (!string.IsNullOrEmpty(search.Cellphone))
                    {
                        query2 = query2.Where(t =>
                            t.CellphoneNumber.Contains(search.Cellphone));
                    }

                    foreach (var nok in query2)
                    {
                        patientslist.Add(new VPatients()
                        {
                            ID = nok.ID,
                            Surname = nok.Surname,
                            Othernames = nok.OtherNames,
                            Type = "NoK"
                        });

                    }
                }

            
                return patientslist;
            }

        }
        public VPatients AddBiodata(VPatients patient)
        {
            using (_context = new PHCEntities())
            {
                var newpatient = new Patients()
                {
                    Title = patient.Title,
                    Surname = patient.Surname,
                    OtherNames = patient.Othernames,
                    Gender = patient.Gender,
                    DOB = patient.DOB,                   
                    EnrollmentNumber = patient.Enrollmentnumber,
                    EnrollmentDate = patient.Enrollmentdate,
                    OccupationID=patient.Occupationid,
                    Active = true
                };

                _context.Patients.Add(newpatient);
                _context.SaveChanges();

                patient.ID = newpatient.ID;

                base.Audittrail(new VAuditTrails()
                {
                    Action = "Insert",
                    ActionBy = 1,
                    ActionDate = DateTime.Now,
                    RecordTable = "Patients",
                    RecordID = patient.ID,
                    Record = JsonConvert.SerializeObject(patient)
                });

               
                patient.Occupation = newpatient.Occupations?.Occupation;

            }
            return patient;
        }

        public void UpdateBiodata(VPatients patient)
        {
            using (_context = new PHCEntities())
            {
                var dbpatient = _context.Patients.Where(t => t.ID == patient.ID).FirstOrDefault();
                if (dbpatient != null)
                {
                    dbpatient.Title = patient.Title;
                    dbpatient.Surname = patient.Surname;
                    dbpatient.OtherNames = patient.Othernames;
                    dbpatient.Gender = patient.Gender;
                    dbpatient.DOB = patient.DOB;                    
                    dbpatient.EnrollmentNumber = patient.Enrollmentnumber;
                    dbpatient.EnrollmentDate = patient.Enrollmentdate;
                    dbpatient.OccupationID = patient.Occupationid;

                    _context.SaveChanges();

                    base.Audittrail(new VAuditTrails()
                    {
                        Action = "Update",
                        ActionBy = 1,
                        ActionDate = DateTime.Now,
                        RecordTable = "Patients",
                        RecordID = dbpatient.ID,
                        Record = JsonConvert.SerializeObject(patient)
                    });
                }
            }

           
           
        }

        public void UpdatePatientLocation(int patientid, int Villageid)
        {
            using (_context = new PHCEntities())
            {
                var dbpatient = _context.Patients.Where(t => t.ID == patientid).FirstOrDefault();
                if (dbpatient != null)
                {

                    dbpatient.LocationID = Villageid;
                    _context.SaveChanges();

                    base.Audittrail(new VAuditTrails()
                    {
                        Action = "Update",
                        ActionBy = 1,
                        ActionDate = DateTime.Now,
                        RecordTable = "Patients",
                        RecordID = dbpatient.ID,
                        Record = JsonConvert.SerializeObject(new { LocationID = Villageid }) 
                });
                }
            }
        }

        public List<VVillages> AddPatientLocation(int patientid, int Villageid)
        {
            using (_context = new PHCEntities())
            {
                List<VVillages> villagelist = new List<VVillages>();
                var dbpatient = _context.Patients.Include("Villages").Where(t => t.ID == patientid).FirstOrDefault();
                if (dbpatient != null)
                {

                    dbpatient.LocationID = Villageid;
                    _context.SaveChanges();

                    var patientvillage = dbpatient.Villages;
                    if (patientvillage != null)
                    {
                        villagelist.Add(new VVillages()
                        {
                            ID=patientvillage.ID,
                            Countyid= patientvillage.Wards.SubCounties.CountyID,
                             Subcountyid=patientvillage.Wards.SubCountyID,
                             Wardid=patientvillage.WardID,
                             Village=patientvillage.Village,
                        });
                    }
                    base.Audittrail(new VAuditTrails()
                    {
                        Action = "Update",
                        ActionBy = 1,
                        ActionDate = DateTime.Now,
                        RecordTable = "Patients",
                        RecordID = dbpatient.ID,
                        Record = JsonConvert.SerializeObject(new { LocationID = Villageid })
                    });
                    
                }

                return villagelist;
            }
        }

        public void DeletePatient(int patientid)
        {
            using (_context = new PHCEntities())
            {
                var dbpatient = _context.Patients.Where(t => t.ID == patientid).FirstOrDefault();
                if (dbpatient != null)
                {

                    dbpatient.Active = false;
                    _context.SaveChanges();

                    base.Audittrail(new VAuditTrails()
                    {
                        Action = "Delete",
                        ActionBy = 1,
                        ActionDate = DateTime.Now,
                        RecordTable = "Patients",
                        RecordID = dbpatient.ID,
                        Record = JsonConvert.SerializeObject(new VPatients()
                        {
                            DOB= dbpatient.DOB,
                            Enrollmentdate=dbpatient.EnrollmentDate,
                            Enrollmentnumber=dbpatient.EnrollmentNumber,
                            Gender=dbpatient.Gender,
                            ID=dbpatient.ID,
                            Occupationid=dbpatient.OccupationID,
                            Othernames=dbpatient.OtherNames,
                            Surname=dbpatient.Surname,
                            Title=dbpatient.Title                            
                        })
                    });                    
                }

                //Delete contacts
                var contacts = dbpatient.Contacts;
                foreach (var contact in contacts)
                {
                    _contacts.DeleteContact(contact.ID);
                }

                //Delete NoK
                var noks = dbpatient.NextOfKins;
                foreach (var nok in noks)
                {
                    _nok.DeleteNok(nok.ID);
                }

            }
        }

        public void MakeNOKpatient(int id)
        {
          var nok=  _context.NextOfKins.Where(t => t.ID == id).FirstOrDefault();

            if (nok != null)
            {
              var newpatient= new Patients()
                {
                  Surname=nok.Surname,
                  OtherNames=nok.OtherNames,                  
                  Active=true
                };

                _context.Patients.Add(newpatient);

                _context.SaveChanges();
                var newpatientcontact = new Contacts()
                {
                    PatientID=newpatient.ID,
                    Cellphone = nok.CellphoneNumber,
                    Active=true
                };

                _context.Contacts.Add(newpatientcontact);

                _context.SaveChanges();

                base.Audittrail(new VAuditTrails()
                {
                    Action = "Insert",
                    ActionBy = 1,
                    ActionDate = DateTime.Now,
                    RecordTable = "Patients",
                    RecordID = newpatient.ID,
                    Record = JsonConvert.SerializeObject(new VPatients()
                    {                       
                        ID = newpatient.ID,                       
                        Othernames = newpatient.OtherNames,
                        Surname = newpatient.Surname,
                    })
                });
            }
        }
    }
}