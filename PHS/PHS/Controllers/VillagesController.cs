using PHS.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PHS.Controllers
{
    public class VillagesController : Controller
    {
        readonly IVillage _village;
        public VillagesController(IVillage village)
        {
            _village = village;
        }
        // GET: Villages
        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public JsonResult Getoptions(int wardid)
        {
            try
            {
                var villages = _village.Getoptions(wardid);
                return Json(new { Result = "OK", Options = villages });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpGet]
        public ActionResult GetVillage_Search(string searchTerm, int wardid)
        {
            var searchedvillagess = _village.Search(searchTerm, wardid);
            int searchcount = searchedvillagess.Count();

            var results = new { searchresults = searchedvillagess, Total = searchcount };

            //Return the data as a jsonp result
            return new JsonResult
            {
                Data = results,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }
}