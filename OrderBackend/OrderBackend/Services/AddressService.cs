namespace OrderBackend.Services
{
    public class AddressService
    {
        private readonly OrdersContext _db;
        public AddressService(OrdersContext db) => _db = db;

        public AddressDto GetCustomerAddress(int addressId)
        {
            return _db.Addresses.Where(x => x.Id == addressId).Select(x => new AddressDto().CopyPropertiesFrom(x)).First();
        }

        public string AddAddress(NewAddressDto newAddress)
        {
            Address addAddress = new Address().CopyPropertiesFrom(newAddress);
            _db.Addresses.Add(addAddress);
            _db.SaveChanges();
            return "Address added";
        }

        public string EditAddress(int addressId, NewAddressDto editAddressInput)
        {
            Address updateAddress = _db.Addresses.Where(x => x.Id == addressId).First();
            updateAddress.Street = editAddressInput.Street;
            updateAddress.City = editAddressInput.City;
            updateAddress.PostCode = editAddressInput.PostCode;
            updateAddress.Country = editAddressInput.Country;
            _db.SaveChanges();
            return "Address updated";
        }
    }
}
