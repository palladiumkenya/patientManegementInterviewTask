using DAL;
using PHS.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PHS.Models
{
    public class Subcounty: ISubcounty
    {
        private PHCEntities _context;
        public Subcounty(PHCEntities context)
        {
            _context = context;
        }

        public List<JDropdown> Get( int CountyID)
        {
            try
            {
                using (_context)
                {
                    List<JDropdown> subcountieslist = new List<JDropdown>();
                    var dbsubcounties = _context.SubCounties.Where(t => t.Active == true && t.CountyID== CountyID);
                    foreach (var dbsubcounty in dbsubcounties)
                    {
                        subcountieslist.Add(new JDropdown()
                        {
                             Value = dbsubcounty.ID.ToString(),
                             DisplayText = dbsubcounty.SubCounty
                        });
                    }
                    return subcountieslist;
                }

            }
            catch (Exception ex)
            {

                throw;
            }

        }

    }
}