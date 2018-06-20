using PHS.Models;
using PHS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static PHS.Models.Occupation;

namespace PHS.Interfaces
{
   public interface IOccupation
    {
        List<SDropdown> Searchoccupations(string searchterm);
        List<JDropdown> Getoptions();
        VOccupations Add(VOccupations item);
        //bool Update(occupationsviewmodel item);
        //bool Delete(int id);

    }
}
