namespace OrderBackend.Services
{
    public class AddressService
    {
        private readonly OrdersContext _db;
        public AddressService(OrdersContext db) => _db = db;

        public string AddAddress(NewAddressDto newAddress)
        {
            Address addAddress = new Address().CopyPropertiesFrom(newAddress);
            _db.Addresses.Add(addAddress);
            _db.SaveChanges();
            return "Address Added";
        }
    }
}
