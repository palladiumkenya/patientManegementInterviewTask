using DAL;
using PHS.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PHS.Models
{
    public class County:ICounty
    {
        private PHCEntities _context;
        public County(PHCEntities context)
        {
            _context = context;
        }

        public List<JDropdown> Get()
        {
            try
            {
                using (_context)
                {
                    List<JDropdown> countieslist = new List<JDropdown>();
                    var dbcounties = _context.Counties.Where(t => t.Active == true);
                    foreach (var dbcounty in dbcounties)
                    {
                        countieslist.Add(new JDropdown()
                        {
                             Value = dbcounty.ID.ToString(),
                             DisplayText = dbcounty.County
                        });
                    }
                    return countieslist;
                }

            }
            catch (Exception ex)
            {

                throw;
            }

        }

    }
}