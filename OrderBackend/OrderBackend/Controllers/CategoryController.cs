using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OrderBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService _dbService;
        public CategoryController(CategoryService db) => _dbService = db;

        [HttpGet("getAllCategories")]
        public List<Category> GetAllCategories()
        {
            return _dbService.GetAllCategories();
        }

        //[HttpPost("addNewCustomer")]
        //public string AddCustomer(NewCustomerDto newCustomer)
        //{
        //    return _dbService.AddCustomer(newCustomer);
            
        //}

        //[HttpPut("editCustomer")]
        //public string EditCustomer(CustomerDto editCustomerDto)
        //{
        //    return _dbService.EditCustomer(editCustomerDto);
        //}
    }
}
