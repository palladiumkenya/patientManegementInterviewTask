using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using PHS.ViewModels;
using PHS.Interfaces;

namespace PHS.Models
{
    public class AuditTrail: IAuditTrail
    {
        private PHCEntities _context;
        public AuditTrail(PHCEntities context) 
        {
            _context = context;
        }

        public List<T> Getautdittrail<T>(VAuditTrails audittrail)
        {
            List<T> auditlist = new List<T>();
          var dbaudits=  _context.AuditTrails.Where(t => t.RecordTable == audittrail.RecordTable && t.Action == audittrail.Action);
            foreach (var dbaudit in dbaudits)
            {
                var trail = JsonConvert.DeserializeObject<T>(dbaudit.Record);
                trail.GetType().GetProperty("Actiondate").SetValue(trail, dbaudit.ActionDate);
                auditlist.Add(trail);
                //auditlist.Add((T) JsonConvert.DeserializeObject<T>(dbaudit.Record));
            }

            return auditlist;
        }
    }
}