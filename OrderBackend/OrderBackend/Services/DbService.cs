namespace OrderBackend.Services
{
    public class DbService
    {
        private readonly OrdersContext _db;
        public DbService(OrdersContext db) => _db = db;

        public List<Order> getOrders()
        {
            return _db.Orders.ToList();
        }
    }
}
