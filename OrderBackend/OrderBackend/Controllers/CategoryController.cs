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

        [HttpGet("getAllMeatPieaces")]
        public List<MeatPieceDto> GetAllMeatPieces()
        {
            return _dbService.GetAllMeatPieces();
        }

        [HttpPost("readCategories")]
        public void ReadCategories()
        {
            _dbService.ReadCategories();
        }

        [HttpGet("SubCategoriesByCategoryId")]
        public List<SubCategory> GetSubCategoriesByCategory(int categoryId)
        {
            return _dbService.GetSubCategoriesByCategory(categoryId);
        }

        [HttpGet("MeatPiecesBySubCategoryId")]
        public List<MeatPiece> GetMeatPiecesBySubcategory(int subCategoryId)
        {
            return _dbService.GetMeatPiecesBySubCategory(subCategoryId);
        }

     

        [HttpPut("updateStockForMeatPiece")]
        public void UpdateStockForMeatPiece(int meatPieceId, double newStock)
        {
            _dbService.UpdateStockForMeatPiece(meatPieceId, newStock);
        }


        [HttpGet("MeatPiecePartsFromMeatPiece")]
        public List<MeatPiecePart> GetMeatPiecePartsFromMeatPiece(int meatPieceId)
        {
            return _dbService.GetAllMeatPieceParts(meatPieceId);
        }

        [HttpPost("addMeatPiecePart")]
        public void AddMeatPiecePart(MeatPiecePartDto meatPiecePartDto)
        {
            _dbService.AddMeatPiecePart(meatPiecePartDto);
        }

        [HttpDelete("deleteMeatPiecePart")]
        public void DeleteMeatPiecePart(int meatPiecePartId)
        {
            _dbService.DeleteMeatPiecePart(meatPiecePartId);
        }
   

        [HttpGet("SubCategoryTotalStock")]
        public double GetSubCategoryTotalStock(int subCategoryId)
        {
            return _dbService.GetStockFromSubCategory(subCategoryId);
        }

        [HttpGet("StockByCategoryId")]
        public double getStockByCategoryId(int categoryId)
        {
            double stock= _dbService.GetStockFromCategory(categoryId);
            return stock;
        }

        [HttpGet("MeatPieceById")]
        public MeatPiece GetMeatPieceById(int meatPieceId)
        {
            return _dbService.GetMeatPieceById(meatPieceId);
        }
        [HttpGet("StockByMeatPieceId")]
        public double getStockByMeatPieceId(int meatPieceId)
        {
            return _dbService.GetStockForMeatPiece(meatPieceId);
        }

        [HttpPut("setMeatPiecePricePerKg")]
        public void SetMeatPiecePricePerKg(int meatPieceId, double pricePerKg)
        {
            _dbService.SetMeatPiecePricePerKg(meatPieceId, pricePerKg);
        }
    }
}