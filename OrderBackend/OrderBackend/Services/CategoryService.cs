using OrdersDb;

namespace OrderBackend.Services
{
    public class CategoryService
    {
        private readonly OrdersContext _db;
        public CategoryService(OrdersContext db) => _db = db;

        public List<Category> GetAllCategories()
        {
            string filePath = "C:\\Users\\Megaport\\Downloads\\APP_Liste Teilstücke.CSV";


            List<Category> categories = new List<Category>();
            List<SubCategory> subCategories = new List<SubCategory>();
            List<MeatPiece> meatPieces = new List<MeatPiece>();

            var lines = File.ReadAllLines(filePath);

            Category currentCategory = null;
            SubCategory currentSubCategory = null;

            foreach (var line in lines)
            {
                var columns = line.Split(';');

                // Wenn die Spalte auf der rechten Seite leer ist, handelt es sich um eine Kategorie
                if (string.IsNullOrWhiteSpace(columns[4]))
                {
                    currentCategory = new Category { Name = columns[0].Trim() };
                    categories.Add(currentCategory);
                }
                // Wenn die Spalte in der Mitte leer ist, handelt es sich um eine Unterkategorie
                else if (string.IsNullOrWhiteSpace(columns[2]))
                {
                    currentSubCategory = new SubCategory
                    {
                        Name = columns[1].Trim(),
                        Category = currentCategory,
                        CategoryId = currentCategory.Id
                    };
                    subCategories.Add(currentSubCategory);
                    currentCategory.SubCategories.Add(currentSubCategory);
                }
                // Andernfalls handelt es sich um ein Teilstück
                else
                {
                    var meatPiece = new MeatPiece
                    {
                        Name = columns[2].Trim(),
                        PricePerKg = 0.0, // Du musst den Preis hier einfügen
                        SubCategory = currentSubCategory,
                        SubCategoryId = currentSubCategory.Id
                    };
                    meatPieces.Add(meatPiece);
                    currentSubCategory.MeatPieces.Add(meatPiece);
                }
            }
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
