using System;
using System.Collections.Generic;

namespace OrdersDb;

public partial class Order
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public DateTime Date { get; set; }

    public virtual ICollection<Article> Articles { get; } = new List<Article>();

    public virtual Customer Customer { get; set; } = null!;
}
