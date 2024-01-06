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
                Id= newOrder.Id,
                Customer = _db.Customers.Find(newOrder.CustomerId),
                SalesDay = _db.SalesDays.Find(newOrder.SalesDayId),
                Date = DateTime.Parse(newOrder.DateString),
                Notes = newOrder.Notes,
                MeatPiece = _db.MeatPieces.Find(newOrder.MeatPieceId),
                amount=newOrder.Amount,
                PaidStatus=newOrder.PaidStatus
                
            };
            _db.Orders.Add(addOrder);
            _db.SaveChanges();
            return "Order added";
        }

        public void DeleteOrder(int deleteOrderId)
        {
            var deleteOrder = _db.Orders.Find(deleteOrderId);
            _db.Orders.Remove(deleteOrder);
            _db.SaveChanges();
           
        }

        public List<Order> getOrdersByCustomer(int customerId)
        {
            return _db.Orders.Where(o => o.Customer.Id == customerId).ToList();
        }
    }
}
