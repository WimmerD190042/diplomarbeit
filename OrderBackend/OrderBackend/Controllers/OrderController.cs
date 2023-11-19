namespace OrderBackend.Controllers;

[Route("[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
  public record struct OkStatus(bool IsOk, int Nr, string? Error = null);
	
  private readonly DbService _dbService;
  public OrderController(DbService db) => _dbService = db;
  
  [HttpGet("Orders")]
  public List<Order> getOrders()
  {
    return _dbService.getOrders();
  }
}
