using System;
using System.Collections.Generic;

namespace OrdersDb;

public partial class Article
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int MeatPieceId { get; set; }

    public double Weight { get; set; }

    public int? OrderId { get; set; }

    public virtual MeatPiece MeatPiece { get; set; } = null!;

    public virtual Order? Order { get; set; }
}
