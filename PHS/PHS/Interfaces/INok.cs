using PHS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHS.Interfaces
{
   public interface INok
    {
        VNok Add(VNok item);
        List<VNok> GetNoks(int Patientid);
        void UpdateNok(VNok item);
        void DeleteNok(int id);
    }
}
