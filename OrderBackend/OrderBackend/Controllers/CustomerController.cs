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
        public List<CustomerDto> GetAllCustomers()
        {
            return _dbService.GetAllCustomers();
        }

        [HttpPost("addNewCustomer")]
        public string AddCustomer(NewCustomerDto newCustomer)
        {
            return _dbService.AddCustomer(newCustomer);
            
        }

        [HttpPut("editCustomer")]
        public string EditCustomer(CustomerDto editCustomerDto)
        {
            return _dbService.EditCustomer(editCustomerDto);
        }

        [HttpDelete("deleteCustomer")]
        public void DeleteCustomer(CustomerDto editCustomerDto)
        {
            _dbService.DeleteCustomer(editCustomerDto);
        }

        [HttpPost("ReadCustomers")]
        public void ReadCustomers()
        {
            _dbService.ReadCustomers();
        }
    }
}
