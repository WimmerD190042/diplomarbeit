﻿using OrdersDb;
using System.Text.Json;

namespace OrderBackend.Services
{
    public class CategoryService
    {
        private readonly OrdersContext _db;
        public CategoryService(OrdersContext db) => _db = db;

        public void ReadAndInsertCategories()
        {
            DotNetEnv.Env.Load();
            var filePath = Environment.GetEnvironmentVariable("CATEGORYDATA");

            List<Category> categories = new List<Category>();
            List<SubCategory> subCategories = new List<SubCategory>();
            List<MeatPiece> meatPieces = new List<MeatPiece>();

            var lines = File.ReadAllLines(filePath);

            Category currentCategory = null;
            SubCategory currentSubCategory = null;

            foreach (var line in lines)
            {
                var columns = line.Split(';');

                if (columns.Length > 1)
                {
                    var category = columns[0].Trim();
                    var subCategory = columns[1].Trim();
                    var meatPieceName = columns[2].Trim();


                    currentCategory = categories.FirstOrDefault(c => c.Name == category);
                    if (currentCategory == null)
                    {
                        currentCategory = new Category { Name = category };
                        categories.Add(currentCategory);
                    }


                    currentSubCategory = subCategories.FirstOrDefault(sc => sc.Name == subCategory && sc.Category == currentCategory);
                    if (string.IsNullOrWhiteSpace(subCategory) || currentSubCategory == null)
                    {
                        currentSubCategory = new SubCategory
                        {
                            Name = subCategory,
                            Category = currentCategory,
                            CategoryId = currentCategory.Id
                        };
                        subCategories.Add(currentSubCategory);
                        currentCategory.SubCategories.Add(currentSubCategory);
                    }

                    // Teilstück erstellen
                    var meatPiece = new MeatPiece
                    {
                        Name = meatPieceName,
                        PricePerKg = 0.0,
                        SubCategory = currentSubCategory,
                        SubCategoryId = currentSubCategory.Id,


                    };
                    meatPieces.Add(meatPiece);
                    currentSubCategory.MeatPieces.Add(meatPiece);
                }

            }


            _db.Categories.AddRange(categories);
            _db.SubCategories.AddRange(subCategories);
            _db.MeatPieces.AddRange(meatPieces);
            _db.SaveChanges();
        }

        public List<MeatPiecePart> GetAllMeatPieceParts(int meatPieceId)
        {
            return _db.MeatPieceParts.Where(mp => mp.MeatPieceId == meatPieceId).ToList();
        }

        public void AddMeatPiecePart(MeatPiecePartDto meatPiecePartDto)
        {
            var meatPiece = _db.MeatPieces.Find(meatPiecePartDto.MeatPieceId);
            var meatPiecePart = new MeatPiecePart
            {
                MeatPiece = meatPiece,
                MeatPieceId = meatPiecePartDto.MeatPieceId,
                Weight = meatPiecePartDto.Weight,
                Notes = meatPiecePartDto.Notes,

            };

            _db.MeatPieceParts.Add(meatPiecePart);
            _db.SaveChanges();
        }

        public List<CategoryDto> GetAllCategories()
        {
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                WriteIndented = true // Optional: für besser lesbaren JSON-Output
            };

            var categories = _db.Categories
                .Include(c => c.SubCategories)
                    .ThenInclude(sc => sc.MeatPieces)
                .OrderBy(c => c.Name)
                .ToList();

            var categoryDtos = categories.Select(category => new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                SubCategories = category.SubCategories.Select(subCategory => new SubCategoryDto
                {
                    Id = subCategory.Id,
                    Name = subCategory.Name,
                    Stock = subCategory.Stock,
                    MeatPieces = subCategory.MeatPieces.Select(meatPiece => new MeatPieceDto
                    {
                        Id = meatPiece.Id,
                        Name = meatPiece.Name,
                        PricePerKg = meatPiece.PricePerKg,
                        //Parts= new List<MeatPiecePartDto>(),

                    }).ToList()
                }).ToList()
            }).ToList();

            return categoryDtos;
        }

        public List<MeatPieceDto> GetAllMeatPieces()
        {
            return _db.MeatPieces.OrderBy(x => x.Name).Select(x => new MeatPieceDto().CopyPropertiesFrom(x)).ToList();
        }

        public void ReadCategories()
        {
            //einkommentieren wenn categories neu geladen werden müssen
            ReadAndInsertCategories();
            _db.SaveChanges();
        }

        public List<SubCategory> GetSubCategoriesByCategory(int categoryId)
        {
            return _db.SubCategories.Where(sc => sc.CategoryId == categoryId).ToList();
        }

        public List<MeatPiece> GetMeatPiecesBySubCategory(int subCategoryId)
        {
            return _db.MeatPieces.Where(mp => mp.SubCategoryId == subCategoryId).ToList();

        }

        public double GetSubCategoryTotalStock(int subCategoryId)
        {
            var totalStock = _db.SubCategories
             .Where(sc => sc.Id == subCategoryId)
             .SelectMany(sc => sc.MeatPieces)
             .Sum(mp => mp.Stock);

            return totalStock;
        }



        public void UpdateStockForMeatPiece(int meatPieceId, double newStock)
        {
            var meatPiece = _db.MeatPieces.Where(mp => mp.Id == meatPieceId).First();
            meatPiece.Stock = newStock;
            _db.SaveChanges();
        }



        public double GetStockFromCategory(int categoryId)
        {
            var stock = _db.Categories.Where(c => c.Id == categoryId).SelectMany(c => c.SubCategories).SelectMany(sc => sc.MeatPieces).Sum(mp => mp.Stock);
            return stock;
        }


        public double GetStockFromSubCategory(int subCategoryId)
        {
            var stock = _db.SubCategories.Where(sc => sc.Id == subCategoryId).SelectMany(sc => sc.MeatPieces).Sum(mp => mp.Stock);
            return stock;
        }

        public void SetMeatPiecePricePerKg(int meatPieceId, double pricePerKg)
        {
            var meatPiece = _db.MeatPieces.Where(mp => mp.Id == meatPieceId).First();
            meatPiece.PricePerKg = pricePerKg;
            _db.SaveChanges();
        }

        public MeatPiece GetMeatPieceById(int meatPieceId)
        {
            return _db.MeatPieces.Find(meatPieceId);
        }
        public double GetStockForMeatPiece(int meatPieceId)
        {
            var meatPiece = _db.MeatPieces.Where(mp => mp.Id == meatPieceId).First();
            return meatPiece.Stock;
        }

    }
}
