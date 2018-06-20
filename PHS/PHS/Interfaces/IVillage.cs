using PHS.Models;
using PHS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHS.Interfaces
{
   public interface IVillage
    {
        List<SDropdown> Search(string searchterm, int wardid);
        List<VVillages> GetPatientVillage(int Patientid);
        List<VVillages> GetVillages(int wardid);
        List<JDropdown> Getoptions(int wardid);
        VVillages Add(VVillages item);
    }
}
