import { Component, Input, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesDayDto, SalesDayService } from '../swagger';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-day-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-day-info.component.html',
  styleUrl: './sales-day-info.component.scss'
})
export class SalesDayInfoComponent implements OnChanges {
  @Input() salesDay: SalesDayDto={};
  private salesDayService= inject(SalesDayService);
  public dataService= inject(DataService);
  public router= inject(Router);

  private dateObject: Date | undefined;
  public formattedDate: string | undefined;

  ngOnChanges(changes: SimpleChanges): void {
      this.formateDate(changes);
  }
  

  deleteClicked() {
    this.salesDayService.apiSalesDaySalesDayDelete(this.salesDay.id).subscribe(x=>this.dataService.loadSalesDaysFromBackend());
  }

  formateDate(changes: SimpleChanges){
    if (changes['salesDay'] && changes['salesDay'].currentValue && changes['salesDay'].currentValue.dateString) {
      this.dateObject = new Date(changes['salesDay'].currentValue.dateString);

      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
      this.formattedDate = this.dateObject.toLocaleDateString('de-DE', options);
      
    } else {
      // Handle the case when dateString is not available
      console.error('Date string is not available.');
    }

  }

  salesDayClicked(salesDay: SalesDayDto) {
    this.dataService.selectedSalesDay.set(salesDay);
    this.router.navigateByUrl('salesDay')
}

}
