import { Component, Inject, Injectable, InjectionToken, computed, inject, signal } from '@angular/core';
import { SalesDayDto, SalesDayService } from './swagger';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
export const SWAGGER_SERVICE_TOKEN = new InjectionToken<SalesDayService>('swaggerService');


class HeroListComponent {}

@Injectable({
  providedIn: 'root',
  
})
export class DataService {
  private service= inject(SalesDayService)

  private dateObject: Date | undefined;         
  public formattedDate: string | undefined;

  
  // hasSalesDays= computed(()=>this.salesDays().length!=0);
  salesDays= signal<SalesDayDto[]>([]);
  selectedSalesDay = new BehaviorSubject<SalesDayDto>({});
 
 
  salesDayDateString = signal('');


  
  constructor() {
      this.loadSalesDaysFromBackend();

    
  }

  getSalesDayDate(salesDay: SalesDayDto) {
    return this.formateDate(salesDay);
  }

  

  loadSalesDaysFromBackend(){
    this.service.apiSalesDayGetSalesDaysGet().subscribe(x=>{
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
