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
    public string AddOrder(OrderDto newOrder)
    {
        _dbService.AddOrder(newOrder);
        return "Order added";
    }

    [HttpDelete("Order")]
    public void DeleteOrder(int deleteOrderId)
    {
        _dbService.DeleteOrder(deleteOrderId);
    }

    [HttpGet("OrdersByCustomer")]
    public List<Order> getOrdersByCustomerId(int customerId)
    {
        return _dbService.getOrdersByCustomer(customerId);
    }

}
