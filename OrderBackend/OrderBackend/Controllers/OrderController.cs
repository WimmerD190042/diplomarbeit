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
}
