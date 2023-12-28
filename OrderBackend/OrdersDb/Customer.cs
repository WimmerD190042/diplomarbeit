using System;
using System.Collections.Generic;

namespace OrdersDb;

public partial class Customer
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;


    public string Address { get; set; } = null!;


    public virtual ICollection<Order> Orders { get; } = new List<Order>();
}
