using PHS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHS.Interfaces
{
  public  interface IWard
    {
        List<JDropdown> Get(int SubcountyId);
    }
}
