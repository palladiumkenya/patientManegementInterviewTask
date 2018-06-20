using PHS.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PHS.Controllers
{
    public class WardsController : Controller
    {
        readonly IWard _ward;
        public WardsController(IWard ward)
        {
            _ward = ward;
        }

        // GET: Wards
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Getoptions(int subcountyid)
        {
            try
            {
                var wards = _ward.Get(subcountyid);
                return Json(new { Result = "OK", Options = wards });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    }
}