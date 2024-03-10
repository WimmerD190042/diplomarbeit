namespace OrderBackend.Dtos
{
    public class OrderDto
    {

        public int Id { get; set; }

        public string DateString { get; set; }

        public double Amount { get; set; }

        public string PaidStatus { get; set; }

        public int CustomerId { get; set; }

        public string CustomerName { get; set; }

        public double Deposit { get; set; }

        public double Price { get; set; }

        public int SalesDayId { get; set; }

        public string Notes { get; set; }

        public int MeatPieceId { get; set; }

        public string MeatPieceName { get; set; }

        public int MeatPiecePartId { get; set; }
    }
}
