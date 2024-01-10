using System;
using System.Collections.Generic;

namespace OrdersDb;

public partial class Order
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public double Deposit { get; set; }

    public double Price { get; set; }

    public int SalesDayId { get; set; }

    public double Amount { get; set; }

    public string PaidStatus { get; set; }

    public DateTime Date { get; set; }

    public string Notes { get; set; } 

    public int MeatPieceId { get; set; }   

    public virtual SalesDay SalesDay { get; set; } = null!;

    public virtual MeatPiece MeatPiece { get; set; } = null!;

    public virtual Customer Customer { get; set; } = null!;
}
