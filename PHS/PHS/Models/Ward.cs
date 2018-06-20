using DAL;
using PHS.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PHS.Models
{
    public class Ward: IWard
    {
        private PHCEntities _context;
        public Ward(PHCEntities context)
        {
            _context = context;
        }

        public List<JDropdown> Get(int SubCountyID)
        {
            try
            {
                using (_context)
                {
                    List<JDropdown> wardlist = new List<JDropdown>();
                    var dbwards = _context.Wards.Where(t => t.Active == true && t.SubCountyID == SubCountyID);
                    foreach (var dbward in dbwards)
                    {
                        wardlist.Add(new JDropdown()
                        {
                            Value = dbward.ID.ToString(),
                            DisplayText = dbward.Ward
                        });
                    }
                    return wardlist;
                }

            }
            catch (Exception ex)
            {

                throw;
            }

        }

    }
}