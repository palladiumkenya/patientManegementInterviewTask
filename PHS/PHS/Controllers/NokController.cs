using PHS.Interfaces;
using PHS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PHS.Controllers
{
    public class NokController : Controller
    {
        readonly INok _nok;
        public NokController(INok nok)
        {
            _nok = nok;
        }

        // GET: Nok
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult List(int ID)
        {
            try
            {
                //Get patients
                var noks = _nok.GetNoks(ID);

                //Return result to jTable
                return Json(new { Result = "OK", Records = noks, TotalRecordCount = noks.Count() });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Create(VNok Nok)
        {
            try
            {              
                if (Nok.Patientid == 0)
                {
                    return Json(new { Result = "ERROR", Message = "Please Add Biodata First" });
                }
                else
                {
                    //Add
                   var addednok= _nok.Add(Nok);
                    return Json(new { Result = "OK", Record = addednok });
                }


            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Update(VNok record)
        {
            try
            {
                _nok.UpdateNok(record);
                return Json(new { Result = "OK"});

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
                _nok.DeleteNok(id);
                return Json(new { Result = "OK" });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    }
}