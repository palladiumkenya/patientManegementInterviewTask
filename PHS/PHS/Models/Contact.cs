using DAL;
using PHS.Interfaces;
using PHS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
namespace PHS.Models
{
    public class Contact: BaseClass, IContact
    {
        private PHCEntities _context;
        public Contact(PHCEntities context) :base(context)
        {
            _context = context;
        }

        public List<VContacts> GetPatientContacts(int Patientid)
        {
            using (_context)
            {
                List<VContacts> contatcslist = new List<VContacts>();

                var dbcontacts = _context.Contacts.Where(t => t.Active == true && t.PatientID == Patientid);
                foreach (var dbcontact in dbcontacts)
                {
                    contatcslist.Add(new VContacts()
                    {
                        Cellphone= dbcontact.Cellphone,
                        Cellphone2= dbcontact.Cellphone2,
                        Email= dbcontact.Email,
                        Patientid= dbcontact.PatientID
                    });

                }               
                return contatcslist;
            }
        }

        public VContacts UpdatePatientContacts(VContacts contacts)
        {
            using (_context)
            {
                var dbcontacts = _context.Contacts.Where(t => t.PatientID == contacts.Patientid).FirstOrDefault();
                if (dbcontacts != null)
                {
                    dbcontacts.Cellphone = contacts.Cellphone;
                    dbcontacts.Cellphone2 = contacts.Cellphone2;
                    dbcontacts.Email = contacts.Email;
                   
                    _context.SaveChanges();

                    base.Audittrail(new VAuditTrails()
                    {
                        Action = "Update",
                        ActionBy = 1,
                        ActionDate = DateTime.Now,
                        RecordTable = "Contacts",
                        RecordID = dbcontacts.ID,
                        Record = JsonConvert.SerializeObject(contacts)
                    });
                }
                else
                {
                    var newcontact=new Contacts()
                    {
                        PatientID= contacts.Patientid,
                        Cellphone= contacts.Cellphone,
                        Cellphone2=contacts.Cellphone2,
                        Email=contacts.Email,
                        Active=true
                    };

                   
                    _context.Contacts.Add(newcontact);
                    
                    _context.SaveChanges();

                    base.Audittrail(new VAuditTrails()
                    {
                        Action = "Insert",
                        ActionBy = 1,
                        ActionDate = DateTime.Now,
                        RecordTable = "Contacts",
                        RecordID = dbcontacts.ID,
                        Record = JsonConvert.SerializeObject(contacts)
                    });
                }

               
                return contacts;
            }
        }

        public void DeleteContact(int id)
        {
            using (_context = new PHCEntities())
            {
                var dbcontact = _context.Contacts.Where(t => t.ID == id).FirstOrDefault();
                if (dbcontact != null)
                {

                    dbcontact.Active = false;
                    _context.SaveChanges();

                    base.Audittrail(new VAuditTrails()
                    {
                        Action = "Delete",
                        ActionBy = 1,
                        ActionDate = DateTime.Now,
                        RecordTable = "Contacts",
                        RecordID = dbcontact.ID,
                        Record = JsonConvert.SerializeObject(new VContacts()
                        {
                            Cellphone2 = dbcontact.Cellphone2,                            
                            Cellphone = dbcontact.Cellphone,
                            Email = dbcontact.Email,
                            Patientid = dbcontact.PatientID                            
                        })
                    });
                }
            }
        }
    }
}