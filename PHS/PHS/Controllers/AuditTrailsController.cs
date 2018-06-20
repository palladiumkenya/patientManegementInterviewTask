using PHS.Interfaces;
using PHS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PHS.Controllers
{
    public class AuditTrailsController : Controller
    {
        readonly IAuditTrail _audittrail;
        public AuditTrailsController(IAuditTrail audittrail)
        {
            _audittrail = audittrail;           
        }
        // GET: AuditTrails
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult PatientsList()
        {
            try
            {
                var audittrail = new VAuditTrails()
                {
                   Action="Delete",
                   RecordTable= "Patients"
                };

                //Get patients
                var patients = _audittrail.Getautdittrail<VPatients>(audittrail);

                //Return result to jTable
                return Json(new { Result = "OK", Records = patients, TotalRecordCount = patients.Count() });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }


    }
}