﻿using System;
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

        public List<Ox> Oxes { get; set; } = new List<Ox>();

        

        public virtual ICollection<Order> Orders { get; } = new List<Order>();



    }
}
