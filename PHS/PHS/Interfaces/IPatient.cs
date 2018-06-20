using PHS.Models;
using PHS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHS.Interfaces
{
   public interface IPatient
    {
        VPatients Getpatient(int id);
        List<VPatients> Getpatients(int id);
        List<VPatients> Getpatients_byage(int age);
        List<VPatients> Searchpatients(PatientsSearch search);
        VPatients AddBiodata(VPatients item);
        void UpdateBiodata(VPatients item);
        void UpdatePatientLocation(int patientid, int Villageid);
        List<VVillages> AddPatientLocation(int patientid, int Villageid);
        void DeletePatient(int patientid);
        void MakeNOKpatient(int id);
    }
}
