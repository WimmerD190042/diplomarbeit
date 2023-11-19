using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OrderBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerService _dbService;
        public CustomerController(CustomerService db) => _dbService = db;

        [HttpGet("getAllCustomers")]
        public List<NewCustomerDto> GetAllCustomers()
        {
            return _dbService.GetAllCustomers();
        }

        [HttpPost("addNewCustomer")]
        public string AddCustomer([FromBody] NewCustomerDto newCustomer)
        {
            return _dbService.AddCustomer(newCustomer);
        }
    }
}
