using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrdersDb
{
    public class MeatPiecePart
    {
        public int Id { get; set; }

        public double Weight { get; set; }

        public string Notes { get; set; }

        public int MeatPieceId { get; set; }

        public virtual MeatPiece MeatPiece { get; set; } = null!;
    }
}
