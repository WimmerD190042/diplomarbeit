using System;
using System.Collections.Generic;

namespace OrdersDb;

public partial class Address
{
    public int Id { get; set; }

    public string Street { get; set; } = null!;

    public string City { get; set; } = null!;

    public int PostCode { get; set; }

    public string Country { get; set; } = null!;

    public virtual ICollection<Customer> Customers { get; } = new List<Customer>();
}
