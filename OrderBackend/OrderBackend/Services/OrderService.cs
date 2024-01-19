﻿namespace OrderBackend.Services
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
            }.CopyPropertiesFrom(y)).ToList();
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
                Amount = newOrder.Amount,
                PaidStatus = newOrder.PaidStatus,
                Deposit = newOrder.Deposit,
                Price = newOrder.Price,
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

        public List<OrderDto> getOrdersByCustomer(int customerId)
        {
            return _db.Orders.Where(o => o.Customer.Id == customerId).Select(y => new OrderDto()
            {
                CustomerName = _db.Customers.Where(x => x.Id == y.CustomerId).Select(x => x.Name).First(),
            }.CopyPropertiesFrom(y)).ToList();
        }
    }
}
