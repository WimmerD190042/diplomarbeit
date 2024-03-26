using System;
using System.Collections.Generic;

namespace OrdersDb;

public partial class MeatPiece
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public double PricePerKg { get; set; }

   

    public int SubCategoryId { get; set; }



    public virtual ICollection<MeatPiecePart> Parts { get; } = new List<MeatPiecePart>();


    public virtual SubCategory SubCategory { get; set; } = null!;
}
