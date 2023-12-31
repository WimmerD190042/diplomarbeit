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
    public string AddOrder(Order order)
    {
        _dbService.AddOrder(order);
        return "Customer added";
    }

}
