using PHS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHS.Interfaces
{
   public interface IContact
    {
        List<VContacts> GetPatientContacts(int Patientid);
        VContacts UpdatePatientContacts(VContacts contacts);
        void DeleteContact(int id);
    }
}
