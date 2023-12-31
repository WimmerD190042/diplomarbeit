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

        public string AddOrder(Order newOrder)
        {
            Order addOrder = new Order().CopyPropertiesFrom(newOrder);
            _db.Orders.Add(addOrder);
            _db.SaveChanges();
            return "Order added";
        }
    }
}
