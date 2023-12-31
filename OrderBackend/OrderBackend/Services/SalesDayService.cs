﻿using Microsoft.AspNetCore.Http;
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

            // Entferne den nicht unterstützten Teil des Strings
            string cleanedDateString = dateString.Substring(0, dateString.IndexOf("GMT"));

            // Konvertiere den bereinigten String in ein DateTime-Objekt
            DateTime parsedDate = DateTime.Parse(cleanedDateString, CultureInfo.InvariantCulture);

            Console.WriteLine(parsedDate);


            SalesDay salesDay = new SalesDay { Id = salesDayDto.Id, Name =salesDayDto.Name,Date=parsedDate};

            _db.SalesDays.Add(salesDay);
            _db.SaveChanges();
        }

    }
}
