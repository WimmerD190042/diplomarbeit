import { Component, Inject, Injectable, InjectionToken, computed, inject, signal } from '@angular/core';
import { CustomerDto, CustomerService, SalesDayDto, SalesDayService } from './swagger';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
export const SWAGGER_salesDayService_TOKEN = new InjectionToken<SalesDayService>('swaggersalesDayService');


class HeroListComponent {}

@Injectable({
  providedIn: 'root',
  
})
export class DataService {
  private salesDayService= inject(SalesDayService)
  private customerService= inject(CustomerService);

  private dateObject: Date | undefined;         
  public formattedDate: string | undefined;

  
  // hasSalesDays= computed(()=>this.salesDays().length!=0);
  customers= signal<CustomerDto[]>([]);
  salesDays= signal<SalesDayDto[]>([]);
  selectedSalesDay = new BehaviorSubject<SalesDayDto>({});
 
 
  salesDayDateString = signal('');


  
  constructor() {
      this.loadSalesDaysFromBackend();
      this.loadCustomersFromBackend();
    
  }

  getSalesDayDate(salesDay: SalesDayDto) {
    return this.formateDate(salesDay);
  }

  
loadCustomersFromBackend(){
  this.customerService.apiCustomerGetAllCustomersGet().subscribe(x=>{
    this.customers.set(x);
  });
}

  loadSalesDaysFromBackend(){
    this.salesDayService.apiSalesDayGetSalesDaysGet().subscribe(x=>{
      this.salesDays.set(x);
    });
  }


formateDate(salesDay: SalesDayDto) {
  if (salesDay && salesDay.dateString) {
    if (!salesDay) {
      return 'Kein Datum ausgewählt';
    }
    console.log("bin hieeer")
    const dateObject = new Date(salesDay.dateString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    console.log(dateObject.toLocaleDateString('de-DE', options)); 
    return dateObject.toLocaleDateString('de-DE', options);
  } else {
    // Handle the case when dateString is not available
    console.error('Date string is not available.');
    return undefined;
  }
}

   
}
