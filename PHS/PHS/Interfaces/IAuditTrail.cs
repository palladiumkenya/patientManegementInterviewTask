using PHS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHS.Interfaces
{
   public interface IAuditTrail
    {
        List<T> Getautdittrail<T>(VAuditTrails audittrail);
    }
}
