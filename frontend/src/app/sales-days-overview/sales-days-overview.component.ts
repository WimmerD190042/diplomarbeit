import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { SalesDayService } from '../swagger';
import { SalesDayInfoComponent } from '../sales-day-info/sales-day-info.component';

@Component({
  selector: 'app-sales-days-overview',
  standalone: true,
  imports: [CommonModule,SalesDayInfoComponent],
  templateUrl: './sales-days-overview.component.html',
  styleUrl: './sales-days-overview.component.scss'
})
export class SalesDaysOverviewComponent {
  public dataService = inject(DataService);
  router = inject(Router);

salesDayClicked() {
      console.log("clickeeeedd")
      this.router.navigateByUrl('salesDay')
}
  
  newSalesDayClick() {
    this.router.navigateByUrl('newSalesDay');
    console.log("new SalesDay clicked")
}

}
