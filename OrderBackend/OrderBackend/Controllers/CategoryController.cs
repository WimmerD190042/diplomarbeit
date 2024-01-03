using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;

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

        [HttpPost("readCategories")]
        public void ReadCategories()
        {
           _dbService.ReadCategories();
        }

        [HttpGet("SubCategoriesByCategory")]
        public List<SubCategory> GetSubCategoriesByCategory(int categoryId)
        {
            return _dbService.GetSubCategoriesByCategory(categoryId);
        }

    }
}
