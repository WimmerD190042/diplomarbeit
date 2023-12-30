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
        public List<CategoryDto> GetAllCategories()
        {
            return _dbService.GetAllCategories();
        }

    }
}
