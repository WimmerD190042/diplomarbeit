namespace OrderBackend.Services
{
    public class OrderService
    {
        private readonly OrdersContext _db;
        public OrderService(OrdersContext db) => _db = db;

        public List<Order> getOrders()
        {
            return _db.Orders.ToList();
        }

        public string AddOrder(OrderDto newOrder)
        {
            Order addOrder = new Order
            {
                Customer = _db.Customers.Find(newOrder.CustomerId),
                SalesDay = _db.SalesDays.Find(newOrder.salesDayId),
                Date = DateTime.Parse(newOrder.DateString),
                Notes = newOrder.Notes,
                MeatPiece = _db.MeatPieces.Find(newOrder.MeatPieceId)
            };
            _db.Orders.Add(addOrder);
            _db.SaveChanges();
            return "Order added";
        }

        public List<Order> getOrdersByCustomer(int customerId)
        {
            return _db.Orders.Where(o => o.Customer.Id == customerId).ToList();
        }
    }
}
