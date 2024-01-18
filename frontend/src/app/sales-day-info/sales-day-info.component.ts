import {
  Component,
  Input,
  inject,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesDayDto, SalesDayService } from '../swagger';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sales-day-info',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './sales-day-info.component.html',
  styleUrl: './sales-day-info.component.scss',
})
export class SalesDayInfoComponent {
  @Input() salesDay: SalesDayDto = {};
  private salesDayService = inject(SalesDayService);
  public dataService = inject(DataService);
  public router = inject(Router);

  private subscription: Subscription = new Subscription();

  deleteClicked() {
    this.salesDayService
      .apiSalesDaySalesDayDelete(this.salesDay.id)
      .subscribe((x) => this.dataService.loadSalesDaysFromBackend());
  }

  salesDayClicked(salesDay: SalesDayDto) {
    this.dataService.selectedSalesDay.next(salesDay);
    console.log('salesDayClicked ' + salesDay.name);
    this.router.navigateByUrl('salesDay');
  }
}
