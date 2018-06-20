using DAL;
using PHS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PHS.Models
{
    public class BaseClass
    {
        // private PHCEntities _context=new PHCEntities();
        private PHCEntities _context;
        public BaseClass(PHCEntities context)
        {
            _context = context;
        }


        public virtual void Audittrail(VAuditTrails audit)
        {
            _context.AuditTrails.Add(new AuditTrails()
            {
                Action= audit.Action,
                Actionby=audit.ActionBy,
                ActionDate=audit.ActionDate,
                Record=audit.Record,
                RecordTable=audit.RecordTable,
                RecordID=audit.RecordID
            });

            _context.SaveChanges();
        }
    }
}