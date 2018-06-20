using PHS.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PHS.Controllers
{
    public class SubcountiesController : Controller
    {
        readonly ISubcounty _subcounty;
        public SubcountiesController(ISubcounty subcounty)
        {
            _subcounty = subcounty;
        }

        // GET: Subcounties
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Getoptions(int countyid)
        {
            try
            {
                var subcounties = _subcounty.Get(countyid);
                return Json(new { Result = "OK", Options = subcounties });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }


    }
}