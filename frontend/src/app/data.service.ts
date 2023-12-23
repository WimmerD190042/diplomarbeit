import { Component, Inject, Injectable, InjectionToken, computed, inject, signal } from '@angular/core';
import { SalesDayDto, SalesDayService } from './swagger';
import { HttpClientModule } from '@angular/common/http';
export const SWAGGER_SERVICE_TOKEN = new InjectionToken<SalesDayService>('swaggerService');


class HeroListComponent {}

@Injectable({
  providedIn: 'root',
  
})
export class DataService {
  private service= inject(SalesDayService)

  private dateObject: Date | undefined;         
  private formattedDate: string | undefined;

  
  // hasSalesDays= computed(()=>this.salesDays().length!=0);
  salesDays= signal<SalesDayDto[]>([]);
  selectedSalesDay= signal<SalesDayDto>({});
  selectedSalesDayFormattedDate=computed(()=>{
    this.dateObject = new Date(this.selectedSalesDay().dateString!);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    this.formattedDate = this.dateObject.toLocaleDateString('de-DE', options);
  });
  
 
  salesDayDateString = signal('');


  
  constructor() {
      this.loadSalesDaysFromBackend();

    
  }

  

  loadSalesDaysFromBackend(){
    this.service.apiSalesDayGetSalesDaysGet().subscribe(x=>{
      this.salesDays.set(x);
    });
  }

   
}
