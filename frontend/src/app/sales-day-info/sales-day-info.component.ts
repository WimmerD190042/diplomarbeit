import { Component, Input, inject, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesDayDto, SalesDayService } from '../swagger';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sales-day-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-day-info.component.html',
  styleUrl: './sales-day-info.component.scss'
})
export class SalesDayInfoComponent implements OnInit {
  @Input() salesDay: SalesDayDto = {};
  private salesDayService = inject(SalesDayService);
  public dataService = inject(DataService);
  public router = inject(Router);

  public formattedDate: string | undefined;
  private subscription: Subscription = new Subscription();


  ngOnInit(): void {
    this.subscription = this.dataService.selectedSalesDay.subscribe(salesDay => {
      this.formattedDate = salesDay ? this.dataService.getSalesDayDate(salesDay) : 'Kein Datum ausgewählt';
    });
  }

  deleteClicked() {
    this.salesDayService.apiSalesDaySalesDayDelete(this.salesDay.id).subscribe(x => this.dataService.loadSalesDaysFromBackend());
  }

  salesDayClicked(salesDay: SalesDayDto) {
    this.dataService.selectedSalesDay.next(salesDay);
    console.log("salesDayClicked " + salesDay.name);
    this.router.navigateByUrl('salesDay')
  }
}
