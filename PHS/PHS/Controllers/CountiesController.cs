using PHS.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PHS.Controllers
{
    public class CountiesController : Controller
    {
        readonly ICounty _county;
        public CountiesController(ICounty county)
        {
            _county = county;
        }

        // GET: Counties
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Getoptions()
        {
            try
            {
                var counties = _county.Get();
                return Json(new { Result = "OK", Options = counties });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    }
}