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

        public List<OrderDto> getOrdersForSalesDay(int salesDayId)
        {
            return _db.Orders.Where(o => o.SalesDay.Id == salesDayId).Select(y => new OrderDto
            {
                CustomerName = _db.Customers.Where(x => x.Id == y.CustomerId).Select(x => x.Name).First(),
                MeatPieceName = _db.MeatPieces.Where(x => x.Id == y.MeatPieceId).Select(x => x.Name).First()
            }.CopyPropertiesFrom(y)).ToList();
        }

        public string GetCategoryNameFromOrder(int orderId)
        {
            var order = _db.Orders.Find(orderId);
            var meatPiece = _db.MeatPieces.Find(order.MeatPieceId);
            return meatPiece.Name;
        }

        public void PayForOrder(int orderId)
        {
            var order = _db.Orders.Find(orderId);
            order.PaidStatus = "true";
            _db.SaveChanges();
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
                Amount = o.Amount,
                PaidStatus = o.PaidStatus,
                Deposit = o.Deposit,
                Price = o.Price,
            }).ToList();
        }

        public int GetOrdersCount(DateTime dateFrom, DateTime dateTo)
        {
            return _db.Orders.Where(o => o.Date >= dateFrom && o.Date <= dateTo).Count();
        }

        public double GetRevenueForTimeSpan(DateTime dateFrom, DateTime dateTo)
        {
            return _db.Orders.Where(o => o.Date >= dateFrom && o.Date <= dateTo).Sum(o => o.Price);
            
        }
        public int GetUnpaidOrdersCount(DateTime dateFrom, DateTime dateTo)
        {
            return _db.Orders.Where(o => o.Date >= dateFrom && o.Date <= dateTo && o.PaidStatus == "false").Count();
        }

        public string AddOrder(OrderPostDto newOrder)
        {
            Order addOrder = new Order
            {
                Id = newOrder.Id,
                Customer = _db.Customers.Find(newOrder.CustomerId),
                SalesDay = _db.SalesDays.Find(newOrder.SalesDayId),
                Date = DateTime.Parse(newOrder.DateString),
                Notes = newOrder.Notes,
                MeatPiece = _db.MeatPieces.Find(newOrder.MeatPieceId),
               
                Amount = newOrder.Amount,
                PaidStatus = newOrder.PaidStatus,
                Deposit = newOrder.Deposit,
                Price = newOrder.Price,
                MeatPiecePartId = newOrder.MeatPiecePartId
                
            };
            _db.Orders.Add(addOrder); 
           
           var meatPiecePart= _db.MeatPieceParts.Find(newOrder.MeatPiecePartId);
            if(meatPiecePart.Weight==newOrder.Amount)
            {
                _db.MeatPieceParts.Remove(meatPiecePart);
            }
            else
            {
                meatPiecePart.Weight = Math.Round(meatPiecePart.Weight - newOrder.Amount,4);
            }
            _db.SaveChanges();
            return "Order added";
        }



        public void DeleteOrder(int deleteOrderId)
        {
            var deleteOrder = _db.Orders.Find(deleteOrderId);
            _db.Orders.Remove(deleteOrder);
            _db.SaveChanges();
        }

        public List<OrderDto> GetOrdersByCustomer(int customerId)
        {
            return _db.Orders.Where(o => o.Customer.Id == customerId).Select(y => new OrderDto()
            {
                CustomerName = _db.Customers.Where(x => x.Id == y.CustomerId).Select(x => x.Name).First(),
                MeatPieceName = _db.MeatPieces.Where(x => x.Id == y.MeatPieceId).Select(x => x.Name).First()
            }.CopyPropertiesFrom(y)).ToList();
        }

       
    }
}
