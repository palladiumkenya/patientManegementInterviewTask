using PHS.Interfaces;
using PHS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PHS.Controllers
{
    public class OccupationsController : Controller
    {
        readonly IOccupation _occupations;
        public OccupationsController(IOccupation occupations)
        {
            _occupations = occupations;
        }
        // GET: Occupations
        public ActionResult Index()
        {
            return View();
        }

        // GET: Occupations/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }
       
        // POST: Occupations/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // POST: Occupations/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // POST: Occupations/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        [HttpPost]
        public JsonResult Getoptions()
        {
            var occupations = _occupations.Getoptions();

            return Json(new { Result = "OK", Options = occupations });           
        }

        [HttpGet]
        public ActionResult GetOccupation_Search(string searchTerm)
        {
           var searchedoccupations= _occupations.Searchoccupations(searchTerm);
           int searchcount = searchedoccupations.Count();

            var results = new { searchresults = searchedoccupations, Total = searchcount };

            //Return the data as a jsonp result
            return new JsonResult
            {
                Data = results,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };          
        }
    }
}
