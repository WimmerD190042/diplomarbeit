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
            //string filePath = "F:\\Temp\\KundenData.csv";
            //using (StreamReader reader = new StreamReader(filePath))
            //{
            //    string content = reader.ReadToEnd();
            //    string[] lines = content.Split("\n");
            //    NewCustomerDto newCustomer = new() ;
            //    foreach (string line in lines)
            //    {
            //        string[] parts = line.Split(";");

            //        if (parts.Length > 1)
            //        {
            //            if (parts[2] == "\r")
            //            {
            //                parts[2] = "";
            //            }

            //             newCustomer = new NewCustomerDto()
            //            {
            //                Name = parts[1],
            //                Address = parts[2],

            //            };
            //        }
                    


            //        Customer addCustomer = new Customer().CopyPropertiesFrom(newCustomer);
            //        _db.Customers.Add(addCustomer);
            //    }
            //    _db.SaveChanges();
            //}

            return _db.Customers.OrderBy(x => x.Name).Select(x => new CustomerDto().CopyPropertiesFrom(x)).ToList();
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
