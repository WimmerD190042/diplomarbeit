using Microsoft.EntityFrameworkCore;

namespace OrderBackend.Controllers;

[Route("[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly OrderService _dbService;
    public OrderController(OrderService db) => _dbService = db;

    [HttpGet("Orders")]
    public List<Order> getOrders()
    {
        return _dbService.getOrders();
    }

    [HttpPost("Order")]
    public string AddOrder(OrderPostDto newOrder)
    {
        _dbService.AddOrder(newOrder);
        return "Order added";
    }

    [HttpGet("OrdersCount")]
    public int GetOrdersCount(DateTime dateFrom, DateTime dateTo)
    {
        return _dbService.GetOrdersCount(dateFrom, dateTo);
    }

    [HttpGet("RevenueForTimeSpan")]
    public double GetRevenueForTimeSpan(DateTime dateFrom, DateTime dateTo)
    {
        return _dbService.GetRevenueForTimeSpan(dateFrom, dateTo);
    }

    [HttpGet("UnpaidOrdersCount")]
    public int GetUnpaidOrdersCount(DateTime dateFrom, DateTime dateTo)
    {
        return _dbService.GetUnpaidOrdersCount(dateFrom, dateTo);
    }

    [HttpGet("OrdersForSalesDay")]
    public List<OrderDto> getOrdersForSalesDay(int salesDayId)
    {
        return _dbService.getOrdersForSalesDay(salesDayId);
    }

    [HttpGet("OrdersFromCustomerForSalesDay")]
    public List<OrderDto> getOrdersFromCustomerForSalesDay(int customerId, int salesDayId)
    {
        return _dbService.getOrdersFromCustomerForSalesDay(customerId, salesDayId);
    }

    [HttpDelete("Order")]
    public void DeleteOrder(int deleteOrderId)
    {
        _dbService.DeleteOrder(deleteOrderId);
    }

    [HttpGet("OrdersByCustomer")]
    public List<OrderDto> getOrdersByCustomerId(int customerId)
    {
        return _dbService.GetOrdersByCustomer(customerId);
    }

    [HttpGet("CategoryNameFromOrder")]
    public string GetCategoryNameFromOrder(int orderId)
    {
        return _dbService.GetCategoryNameFromOrder(orderId);
    }

    [HttpPost("PayForOrder")]
    public void PayForOrder(int orderId)
    {
        _dbService.PayForOrder(orderId);
    }

    [HttpGet("OrdersForDashboard")]
    public List<OrderDashboardDto> GetOrdersForDashboard(DateTime startDate, DateTime endDate)
    {
        return _dbService.GetOrdersForDashboard(startDate, endDate);
    }
}
