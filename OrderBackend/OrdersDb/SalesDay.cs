using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrdersDb
{
    public partial class SalesDay
    {

        public int Id { get; set; }
        public DateTime Date { get; set; }

        public string Name { get; set; }

        public virtual ICollection<string> Oxes { get; } = new List<string>();


        public virtual ICollection<Order> Orders { get; } = new List<Order>();



    }
}
