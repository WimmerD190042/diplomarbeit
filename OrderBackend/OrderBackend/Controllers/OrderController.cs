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
        return _dbService.getOrdersByCustomer(customerId);
    }
}
