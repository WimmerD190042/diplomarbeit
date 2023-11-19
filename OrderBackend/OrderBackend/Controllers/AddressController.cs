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

        [HttpPost("addAddress")]

        public string AddAddress(NewAddressDto newAddress)
        {
            return _dbService.AddAddress(newAddress);
        }
    }
}
