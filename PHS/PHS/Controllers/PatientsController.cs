using PHS.Interfaces;
using PHS.Models;
using PHS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PHS.Controllers
{
    public class PatientsController : Controller
    {
        readonly IPatient _patient;
        readonly IOccupation _occupation;
        readonly IVillage _village;
        readonly IContact _contact;
        public PatientsController(IPatient patient, IOccupation occupation, IVillage village, IContact contact)
        {
            _patient = patient;
            _occupation = occupation;
            _village = village;
            _contact = contact;
        }


        // GET: Patients
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AgeSearch()
        {
            return View();
        }

        public ActionResult PatientsNoK()
        {
            return View();
        }

        [HttpPost]
        public JsonResult List(string Name="", string CellPhone="", String Enrollmentdate="", string Enrollmentnumber="", int Type = 0)
        {
            try
            {
               var searchfilters= new PatientsSearch()
                {
                    Name=Name,
                    Cellphone=CellPhone,
                    Enrollmentdate=Enrollmentdate,
                    Enrollmentnumber=Enrollmentnumber,
                    Type= Type
               };

                //Get patients
              var patients=  _patient.Searchpatients(searchfilters);
               
                //Return result to jTable
                return Json(new { Result = "OK", Records = patients, TotalRecordCount = patients.Count() });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Get(int Id)
        {
            try
            {               
                //Get patients
                var patient = _patient.Getpatients(Id);

                //Return result to jTable
                return Json(new { Result = "OK", Records = patient, TotalRecordCount = patient.Count() });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult ListAged(int age)
        {
            try
            {
               
                //Get patients
                var patients = _patient.Getpatients_byage(age);

                //Return result to jTable
                return Json(new { Result = "OK", Records = patients, TotalRecordCount = patients.Count() });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult GetPatientVillage(int Id)
        {
            try
            {
                //Get patients
                var village = _village.GetPatientVillage(Id);

                //Return result to jTable
                return Json(new { Result = "OK", Records = village, TotalRecordCount = village.Count() });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult GetPatientContacts(int Id)
        {
            try
            {
                //Get patients
                var contacts = _contact.GetPatientContacts(Id);

                //Return result to jTable
                return Json(new { Result = "OK", Records = contacts, TotalRecordCount = contacts.Count() });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Create(VPatients patient)
        {
            try
            {
                //if (!ModelState.IsValid)
                //{
                //    return Json(new { Result = "ERROR", Message = "Form is not valid! Please correct it and try again." });

                //}

                if (patient.Occupationid==0 || patient.Occupationid == null)
                {
                  var addedoccupation=  _occupation.Add(new VOccupations()
                    {
                        Occupation = patient.Occupation
                    });

                    patient.Occupationid = addedoccupation.ID;
                }

                if (patient.ID == 0)
                {                   
                    //Add patient biodata
                    patient = _patient.AddBiodata(patient);
                    return Json(new { Result = "OK", Record = patient });
                }
                else
                {
                    //Update patient biodata
                    _patient.UpdateBiodata(patient);
                    return Json(new { Result = "OK" });
                }

              

            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult UpdatePatientVillage(VVillages location)
        {
            try
            {               
                if (location.Villageid == 0 || location.Villageid == null)
                {
                    var addedvillage = _village.Add(new VVillages()
                    {
                        Village = location.Village,
                        Wardid= location.Wardid
                    });

                    location.Villageid = addedvillage.ID;
                }

                if (location.Patientid == 0)
                {                    
                    return Json(new { Result = "ERROR", Message = "Please Add Biodata First" });
                }
                else
                {
                    //Update patient location
                    _patient.UpdatePatientLocation(location.Patientid, location.Villageid.Value);
                    return Json(new { Result = "OK" });
                }



            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult AddPatientVillage(VVillages location)
        {
            try
            {
                if (location.Villageid == 0 || location.Villageid == null)
                {
                    var addedvillage = _village.Add(new VVillages()
                    {
                        Village = location.Village,
                        Wardid = location.Wardid
                    });

                    location.Villageid = addedvillage.ID;
                }

                if (location.Patientid == 0)
                {
                    return Json(new { Result = "ERROR", Message = "Please Add Biodata First" });
                }
                else
                {
                    //Update patient location
                   var village= _patient.AddPatientLocation(location.Patientid, location.Villageid.Value);
                   return Json(new { Result = "OK" ,Records = village });
                }



            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult UpdatePatientContacts(VContacts contacts)
        {
            try
            {
              
                if (contacts.Patientid == 0)
                {                   
                    return Json(new { Result = "ERROR", Message = "Please Add Biodata First" });
                }
                else
                {
                    //Update patient contacts
                  var addedcontact=  _contact.UpdatePatientContacts(contacts);
                    return Json(new { Result = "OK", Record = addedcontact });
                }



            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            try
            {
                _patient.DeletePatient(id);
                return Json(new { Result = "OK" });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult MakeNOKPatient(int id)
        {
            try
            {
                _patient.MakeNOKpatient(id);
                return Json(new { Result = "OK" });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    }
}
