using OrdersDb;

namespace OrderBackend.Services
{
    public class CustomerService
    {
        private readonly OrdersContext _db;
        public CustomerService(OrdersContext db) => _db = db;

        public List<CustomerDto> GetAllCustomers()
        {
            //Kunden von File importieren -> filePath ersetzen, und einkommentieren
            /*string filePath = "C:\\Schule\\diplomarbeit\\Daten\\KundenDaten.txt";
            using (StreamReader reader = new StreamReader(filePath))
            {
                string content = reader.ReadToEnd();
                string[] lines = content.Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
                foreach (string line in lines)
                {
                    NewCustomerDto newCustomer = new NewCustomerDto()
                    {
                        FirstName = line,
                        LastName = "",
                        AddressId = 1,
                    };

                    Customer addCustomer = new Customer().CopyPropertiesFrom(newCustomer);
                    _db.Customers.Add(addCustomer);
                }
                _db.SaveChanges();
            }*/
            
            return _db.Customers.Select(x => new CustomerDto().CopyPropertiesFrom(x)).ToList();
        }

        public string AddCustomer(NewCustomerDto newCustomer)
        {
            Customer addCustomer = new Customer().CopyPropertiesFrom(newCustomer);
            _db.Customers.Add(addCustomer);
            _db.SaveChanges();
            return "Customer added";
        }

        public string EditCustomer(int customerId, EditCustomerDto editCustomerInput)
        {
            Customer updateCustomer = _db.Customers.Where(x => x.Id == customerId).First();
            updateCustomer.FirstName = editCustomerInput.FirstName;
            updateCustomer.LastName = editCustomerInput.LastName;
            _db.SaveChanges();
            return "Customer edite";
        }
    }
}
