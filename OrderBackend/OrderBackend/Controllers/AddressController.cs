using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OrderBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly AddressService _dbService;
        public AddressController(AddressService db) => _dbService = db;

        [HttpGet("getCustomerAddress")]
        public AddressDto GetCustomerAddress(int addressId)
        {
            return _dbService.GetCustomerAddress(addressId);
        }

        [HttpPost("addAddress")]
        public string AddAddress(NewAddressDto newAddress)
        {
            return _dbService.AddAddress(newAddress);
        }

        [HttpPut("editAddress")]
        public string EditAddress(int addressId, NewAddressDto editAddressInput)
        {
            return _dbService.EditAddress(addressId, editAddressInput);
        }
    }
}
