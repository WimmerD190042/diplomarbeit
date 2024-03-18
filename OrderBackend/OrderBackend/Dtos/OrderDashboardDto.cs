namespace OrderBackend.Dtos
{
    public class OrderDashboardDto
    {


        public int Id { get; set; }
        public string CustomerName {  get; set; }
        public double Amount { get; set; }
        public double Price { get; set; }
        public double Deposit { get; set; }
        public string Notes { get; set; }
        public string PaidStatus { get; set; }
    }
}