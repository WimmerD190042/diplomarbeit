using Microsoft.AspNetCore.Http;
using System.Globalization;

namespace OrderBackend.Services
{
    public class SalesDayService
    {
        private readonly OrdersContext _db;
        public SalesDayService(OrdersContext db) => _db = db;

        public List<SalesDayDto> GetSalesDays()
        {
            return _db.SalesDays.OrderBy(x=>x.Date).Select(x=>new SalesDayDto {Id=x.Id,Name=x.Name,DateString=x.Date.ToString("O")}).ToList();
        }

        public void deleteSalesDay(int id)
        {
           SalesDay salesDay= _db.SalesDays.Where(x => x.Id.Equals(id)).First();
            _db.SalesDays.Remove(salesDay);
            _db.SaveChanges();
        }


        public void addSalesDay(SalesDayDto salesDayDto)
        {
            string dateString = salesDayDto.DateString;





            DateTime parsedDate = DateTime.Parse(dateString);

            Console.WriteLine(parsedDate);


            SalesDay salesDay = new SalesDay { Id = salesDayDto.Id, Name =salesDayDto.Name,Date=parsedDate};

            _db.SalesDays.Add(salesDay);
            _db.SaveChanges();
        }

        public List<Ox> getOxes(int salesDayId)
        {
            if(salesDayId==0)
            {
                return new List<Ox>();
            }
            SalesDay salesDay = _db.SalesDays.Where(x => x.Id.Equals(salesDayId)).First();
                return salesDay.Oxes.ToList();
        }

        public void addOx(int salesDayId, string oxName)
        {
            SalesDay salesDay = _db.SalesDays.Where(x => x.Id.Equals(salesDayId)).First();
            Ox ox = new Ox { Name = oxName,SalesDayId=salesDayId };
            salesDay.Oxes.Add(ox);
            _db.SaveChanges();
        }

    }
}
