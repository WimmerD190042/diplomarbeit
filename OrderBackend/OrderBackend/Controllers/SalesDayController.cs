using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OrderBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesDayController : ControllerBase
    {
        private readonly SalesDayService _dbService;
        public SalesDayController(SalesDayService db) => _dbService = db;

        [HttpGet("getSalesDays")]
        public List<SalesDayDto> GetCustomerAddress()
        {
            return _dbService.GetSalesDays();
        }

        [HttpPost("addSalesDay")]
        public void AddSalesDay(SalesDayDto salesDay)
        {
            _dbService.addSalesDay(salesDay);
        }

        [HttpDelete("SalesDay")]
        public void DeleteSalesDay(int salesDayId)
        {
            _dbService.deleteSalesDay(salesDayId);
        }

        //[HttpPost("addOx")]
        //public void AddOx(int salesDayId, string ox)
        //{
        //    _dbService.addOx(salesDayId, ox);
        //}

    }
}
