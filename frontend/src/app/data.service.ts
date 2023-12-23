import { Component, Inject, Injectable, InjectionToken, inject, signal } from '@angular/core';
import { SalesDayDto, SalesDayService } from './swagger';
import { HttpClientModule } from '@angular/common/http';
export const SWAGGER_SERVICE_TOKEN = new InjectionToken<SalesDayService>('swaggerService');


class HeroListComponent {}

@Injectable({
  providedIn: 'root',
  
})
export class DataService {
  private service= inject(SalesDayService)
  

  salesDays= signal<SalesDayDto[]>([]);
  salesDayName= signal('');
  salesDayDateString = signal('');
  salesDayDate= signal(null);

  
  constructor() {
      this.loadSalesDaysFromBackend();

    
  }

  

  loadSalesDaysFromBackend(){
    this.service.apiSalesDayGetSalesDaysGet().subscribe(x=>{
      this.salesDays.set(x);
    });
  }

   
}
