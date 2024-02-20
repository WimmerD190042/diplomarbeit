using System;
using System.Collections.Generic;

namespace OrdersDb;

public partial class SubCategory
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public double Stock => MeatPieces.Sum(mp => mp.Stock);

    public int CategoryId { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<MeatPiece> MeatPieces { get; } = new List<MeatPiece>();
}
