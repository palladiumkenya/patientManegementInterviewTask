using DAL;
using Newtonsoft.Json;
using PHS.Interfaces;
using PHS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PHS.Models
{
    public class Nok: BaseClass, INok
    {
        private PHCEntities _context;
        public Nok(PHCEntities context) : base(context)
        {
            _context = context;
        }


        public VNok Add(VNok nok)
        {
            using (_context)
            {
                var newnok = new NextOfKins()
                {
                    CellphoneNumber = nok.Cellphone,
                    Email= nok.Email,
                    OtherNames=nok.Othernames,
                    Surname=nok.Surname,
                    PatientID=nok.Patientid,
                    Active = true
                };
                _context.NextOfKins.Add(newnok);
                _context.SaveChanges();
                nok.ID = newnok.ID;

                base.Audittrail(new VAuditTrails()
                {
                    Action = "Insert",
                    ActionBy = 1,
                    ActionDate = DateTime.Now,
                    RecordTable = "NextOfKins",
                    RecordID = nok.ID,
                    Record = JsonConvert.SerializeObject(nok)
                });

                return nok;
            }


        }
        public List<VNok> GetNoks(int Patientid)
        {
            try
            {
                using (_context)
                {
                    List<VNok> noklist = new List<VNok>();
                    var dbnoks = _context.NextOfKins.Where(t => t.Active == true && t.PatientID== Patientid);
                    foreach (var dbnok in dbnoks)
                    {
                        noklist.Add(new VNok()
                        {
                            ID=dbnok.ID,
                            Cellphone=dbnok.CellphoneNumber,
                            Email=dbnok.Email,
                            Othernames=dbnok.OtherNames,
                            Surname=dbnok.Surname,
                            Patientid=dbnok.PatientID
                        });
                    }
                    return noklist;
                }

            }
            catch (Exception ex)
            {

                throw;
            }

        }
        public void UpdateNok(VNok nok)
        {
            using (_context)
            {
                var dbnok = _context.NextOfKins.Where(t => t.ID == nok.ID).FirstOrDefault();
                if (dbnok != null)
                {
                    dbnok.OtherNames = nok.Othernames;
                    dbnok.Surname = nok.Surname;
                    dbnok.CellphoneNumber = nok.Cellphone;
                    dbnok.Email = nok.Email;                   
                    _context.SaveChanges();

                    base.Audittrail(new VAuditTrails()
                    {
                        Action = "Update",
                        ActionBy = 1,
                        ActionDate = DateTime.Now,
                        RecordTable = "NextOfKins",
                        RecordID = nok.ID,
                        Record = JsonConvert.SerializeObject(nok)
                    });
                }
            }
        }

        public void DeleteNok(int id)
        {
            using (_context=new PHCEntities())
            {
                var dbnok = _context.NextOfKins.Where(t => t.ID == id).FirstOrDefault();
                if (dbnok != null)
                {

                    dbnok.Active = false;
                    _context.SaveChanges();

                    base.Audittrail(new VAuditTrails()
                    {
                        Action = "Delete",
                        ActionBy = 1,
                        ActionDate = DateTime.Now,
                        RecordTable = "NextOfKins",
                        RecordID = dbnok.ID,
                        Record = JsonConvert.SerializeObject(new VNok()
                        {                           
                            ID = dbnok.ID,
                            Othernames = dbnok.OtherNames,
                            Surname = dbnok.Surname,
                            Cellphone = dbnok.CellphoneNumber,
                            Email=dbnok.Email,
                            Patientid=dbnok.PatientID
                        })
                    });
                }
            }
        }
    }
}