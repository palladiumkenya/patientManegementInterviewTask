using DAL;
using PHS.Interfaces;
using PHS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PHS.Models
{
    public class Village: IVillage
    {
        private PHCEntities _context;
        public Village(PHCEntities context)
        {
            _context = context;
        }

        public List<SDropdown> Search( string Searchterm ,int Wardid)
        {
            try
            {
                using (_context)
                {
                    List<SDropdown> villagelist = new List<SDropdown>();
                    var dbvillages = _context.Villages.Where(t => t.Active == true && t.WardID == Wardid && t.Village.Contains(Searchterm));
                    foreach (var dbvillage in dbvillages)
                    {
                        villagelist.Add(new SDropdown()
                        {
                            id = dbvillage.ID.ToString(),
                            text = dbvillage.Village
                        });
                    }
                    return villagelist;
                }

            }
            catch (Exception ex)
            {

                throw;
            }

        }

        public List<VVillages> GetPatientVillage(int Patientid)
        {
            try
            {
                using (_context)
                {
                    List<VVillages> villages = new List<VVillages>();
                    var dbpatients = _context.Patients.Where(t => t.ID == Patientid && t.LocationID != null);
                    foreach (var dbpatient in dbpatients)
                    {
                        villages.Add(new VVillages()
                        {
                            Villageid = dbpatient.LocationID,
                            Countyid = dbpatient.Villages.Wards.SubCounties.CountyID,
                            Subcountyid = dbpatient.Villages.Wards.SubCountyID,
                            Wardid = dbpatient.Villages.WardID,  
                            Village=dbpatient.Villages.Village,
                            Patientid= dbpatient.ID
                        });
                    }
                    return villages;
                }

            }
            catch (Exception ex)
            {

                throw;
            }

        }

        public List<VVillages> GetVillages(int wardid)
        {
            try
            {
                using (_context)
                {
                    List<VVillages> villages = new List<VVillages>();
                    var dbvillages = _context.Villages.Where(t => t.WardID == wardid);
                    foreach (var dbvillage in dbvillages)
                    {
                        villages.Add(new VVillages()
                        {
                            ID = dbvillage.ID,
                            Village=dbvillage.Village,
                            Countyid = dbvillage.Wards.SubCounties.CountyID,
                            Subcountyid = dbvillage.Wards.SubCountyID,
                            Wardid = dbvillage.WardID,
                        });
                    }
                    return villages;
                }

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public List<JDropdown> Getoptions(int wardid)
        {
            try
            {
                using (_context)
                {
                    List<JDropdown> villages = new List<JDropdown>();
                    var dbvillages = _context.Villages.Where(t => t.WardID == wardid);
                    foreach (var dbvillage in dbvillages)
                    {
                        villages.Add(new JDropdown()
                        {
                            Value = dbvillage.ID.ToString(),
                            DisplayText = dbvillage.Village,                           
                        });
                    }
                    return villages;
                }

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public VVillages Add(VVillages village)
        {
            using (_context)
            {
                var newvillage = new Villages()
                {
                    WardID = village.Wardid,
                    Village=village.Village,                    
                    Active = true
                };
                _context.Villages.Add(newvillage);
                _context.SaveChanges();
                village.ID = newvillage.ID;
                //village.Subcountyid = newvillage.Wards.SubCountyID;
                //village.Countyid = newvillage.Wards.SubCounties.CountyID;
                return village;
            }
        }
    }
}