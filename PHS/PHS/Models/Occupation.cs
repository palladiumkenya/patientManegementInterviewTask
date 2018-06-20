using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DAL;
using PHS.Interfaces;
using PHS.ViewModels;

namespace PHS.Models
{
    public class Occupation: IOccupation
    {
        private PHCEntities _context;
        public Occupation(PHCEntities context)
        {
            _context = context;
        }

        public List<SDropdown> Searchoccupations(string Searchterm)
        {
            try
            {
                using ( _context)
                {
                    List<SDropdown> occupationslist = new List<SDropdown>();
                    var dboccupations = _context.Occupations.Where(t => t.Active == true && t.Occupation.Contains(Searchterm));
                    foreach (var dboccupation in dboccupations)
                    {
                        occupationslist.Add(new SDropdown()
                        {
                            id = dboccupation.ID.ToString(),
                            text = dboccupation.Occupation
                        });
                    }
                    return occupationslist;
                }
              
            }
            catch (Exception ex)
            {

                throw;
            }
          
        }

        public List<JDropdown> Getoptions()
        {
            try
            {
                using (_context)
                {
                    List<JDropdown> occupationslist = new List<JDropdown>();
                    var dboccupations = _context.Occupations.Where(t => t.Active == true);
                    foreach (var dboccupation in dboccupations)
                    {
                        occupationslist.Add(new JDropdown()
                        {
                            Value = dboccupation.ID.ToString(),
                            DisplayText = dboccupation.Occupation
                        });
                    }
                    return occupationslist;
                }

            }
            catch (Exception ex)
            {

                throw;
            }

        }

        public VOccupations Add(VOccupations occupation)
        {
            using (_context)
            {
                var newoccupation = new Occupations()
                {
                    Occupation = occupation.Occupation,
                    Active = true
                };
                _context.Occupations.Add(newoccupation);
                _context.SaveChanges();
                occupation.ID = newoccupation.ID;
                return occupation;
            }
        }
        

    }
}