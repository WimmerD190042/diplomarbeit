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

        [HttpGet("MeatPiecesBySubCategory")]
        public List<MeatPiece> GetMeatPiecesBySubcategory(int subCategoryId)
        {
            return _dbService.GetMeatPiecesBySubCategory(subCategoryId);
        }

        [HttpGet("stockOfSubcategory")]
        public double GetSubCategoryTotalStock(int subCategoryId)
        {
            return _dbService.GetSubCategoryTotalStock(subCategoryId);
        }

        [HttpPut("updateStockForMeatPiece")]
        public void UpdateStockForMeatPiece(int meatPieceId, double newStock)
        {
            _dbService.UpdateStockForMeatPiece(meatPieceId, newStock);
        }

        [HttpPut("addStockForSubCategory")]
        public void AddStockForSubCategory(int subCategoryId, double newStock)
        {
            _dbService.AddStockForSubCategory(subCategoryId, newStock);
        }

        [HttpPut("updateStockForSubCategory")]
        public void UpdateStockForCategory(int subCategoryId, double newStock)
        {
            _dbService.UpdateStockForCategory(subCategoryId, newStock);
        }


    }
}
