using System;
using System.Collections.Generic;

namespace OrdersDb;

public partial class Customer
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int AddressId { get; set; }

    public virtual Address Address { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; } = new List<Order>();
}
