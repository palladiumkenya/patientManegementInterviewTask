using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
   public interface IPHCEntities:IDisposable
    {
        DbSet<NextOfKins> NextOfKins { get; set; }
         DbSet<Patients> Patients { get; set; }
         DbSet<Counties> Counties { get; set; }       
         DbSet<Occupations> Occupations { get; set; }
         DbSet<SubCounties> SubCounties { get; set; }
         DbSet<Villages> Villages { get; set; }
         DbSet<Wards> Wards { get; set; }
    }
}
