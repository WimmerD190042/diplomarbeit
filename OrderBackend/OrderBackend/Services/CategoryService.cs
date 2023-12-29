using OrdersDb;

namespace OrderBackend.Services
{
    public class CategoryService
    {
        private readonly OrdersContext _db;
        public CategoryService(OrdersContext db) => _db = db;
        string filePath = "C:\\Users\\Megaport\\Desktop\\diplomarbeit\\diplomarbeit\\Daten\\GesamteTiere.TXT";


        public void ReadAndInsertCategories()
        {
            List<Category> categories = new List<Category>();
            List<SubCategory> subCategories = new List<SubCategory>();
            List<MeatPiece> meatPieces = new List<MeatPiece>();

            var lines = File.ReadAllLines(filePath);

            Category currentCategory = null;
            SubCategory currentSubCategory = null;

            foreach (var line in lines)
            {
                var columns = line.Split(';');

                // Entferne Leerzeichen
                if (columns.Length > 1)
                {
                    var category = columns[0].Trim();
                    var subCategory = columns[1].Trim();
                    var meatPieceName = columns[2].Trim();

                    // Kategorie erstellen, falls nicht vorhanden
                    currentCategory = categories.FirstOrDefault(c => c.Name == category);
                    if (currentCategory == null)
                    {
                        currentCategory = new Category { Name = category };
                        categories.Add(currentCategory);
                    }

                    // Unterkategorie erstellen, falls nicht vorhanden
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
                        PricePerKg = 0.0, // Du musst den Preis hier einfügen
                        SubCategory = currentSubCategory,
                        SubCategoryId = currentSubCategory.Id
                    };
                    meatPieces.Add(meatPiece);
                    currentSubCategory.MeatPieces.Add(meatPiece);
                }
                
            }

            // Hier füge die Kategorien, Unterkategorien und Teilstücke zur Datenbank hinzu
            _db.Categories.AddRange(categories);
            _db.SubCategories.AddRange(subCategories);
            _db.MeatPieces.AddRange(meatPieces);
            _db.SaveChanges();
        }



        public List<Category> GetAllCategories()
        {


            ReadAndInsertCategories();
            _db.SaveChanges();
            return _db.Categories.OrderBy(x => x.Name).ToList();

        }

        public string AddCustomer(NewCustomerDto newCustomer)
        {
            Customer addCustomer = new Customer().CopyPropertiesFrom(newCustomer);
            _db.Customers.Add(addCustomer);
            _db.SaveChanges();
            return "Customer added";


        }

        public string EditCustomer(CustomerDto Customer)
        {
            Customer updateCustomer = _db.Customers.Where(x => x.Id == Customer.Id).First();
            updateCustomer.Name = Customer.Name;
            updateCustomer.Id= Customer.Id;
            updateCustomer.Address = Customer.Address;
            _db.SaveChanges();
            return "Customer edited";
        }
    }
}
