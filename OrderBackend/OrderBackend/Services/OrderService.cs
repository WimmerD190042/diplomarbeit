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

        public List<Order> getOrdersForSalesDay(int salesDayId)
        {
            return _db.Orders.Where(o => o.SalesDay.Id == salesDayId).ToList();
        }

        public List<OrderDto> getOrdersFromCustomerForSalesDay(int customerId, int salesDayId)
        {
            return _db.Orders.Where(o => o.Customer.Id == customerId && o.SalesDay.Id == salesDayId).Select(o => new OrderDto
            {
                Id = o.Id,
                CustomerId = o.Customer.Id,
                SalesDayId = o.SalesDay.Id,
                DateString = o.Date.ToString(),
                Notes = o.Notes,
                MeatPieceId = o.MeatPiece.Id,
                Amount = o.amount,
                PaidStatus = o.PaidStatus
            }).ToList();
        }

        public string AddOrder(OrderDto newOrder)
        {
            Order addOrder = new Order
            {
                Id = newOrder.Id,
                Customer = _db.Customers.Find(newOrder.CustomerId),
                SalesDay = _db.SalesDays.Find(newOrder.SalesDayId),
                Date = DateTime.Parse(newOrder.DateString),
                Notes = newOrder.Notes,
                MeatPiece = _db.MeatPieces.Find(newOrder.MeatPieceId),
                amount = newOrder.Amount,
                PaidStatus = newOrder.PaidStatus

            };
            _db.Orders.Add(addOrder);
            //Find me the subcategory of the newOrder from the meatpiece
           var meatPiece= _db.MeatPieces.Find(newOrder.MeatPieceId);
            var subCategory = _db.SubCategories.Find(meatPiece.SubCategoryId);
            subCategory.Stock -= newOrder.Amount;
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
