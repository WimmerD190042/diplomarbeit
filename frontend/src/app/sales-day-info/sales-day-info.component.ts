import { Component, Input, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesDayDto, SalesDayService } from '../swagger';
import { DataService } from '../data.service';

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
  private dataService= inject(DataService);

  private dateObject: Date | undefined;
  public formattedDate: string | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['salesDay'] && changes['salesDay'].currentValue && changes['salesDay'].currentValue.dateString) {
      this.dateObject = new Date(changes['salesDay'].currentValue.dateString);

      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
      this.formattedDate = this.dateObject.toLocaleDateString('de-DE', options);
    } else {
      // Handle the case when dateString is not available
      console.error('Date string is not available.');
    }
  }

  onDeleteClick() {
    this.salesDayService.apiSalesDaySalesDayDelete(this.salesDay.id).subscribe(x=>this.dataService.loadSalesDaysFromBackend());
  }
}
