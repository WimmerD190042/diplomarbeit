import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { SalesDayDto, SalesDayService } from '../swagger';
import { SalesDayInfoComponent } from '../sales-day-info/sales-day-info.component';
import { SubCategoryInfoComponent } from '../stock-overview/sub-category-info/sub-category-info.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales-days-overview',
  standalone: true,
  imports: [CommonModule,SubCategoryInfoComponent, SalesDayInfoComponent, FormsModule],
  templateUrl: './sales-days-overview.component.html',
  styleUrl: './sales-days-overview.component.scss',
})
export class SalesDaysOverviewComponent {
  public dataService = inject(DataService);
  nameForSalesDay : string = "";
  dateForSalesDay : string = "";
  router = inject(Router);

  salesDayClicked() {
    this.router.navigateByUrl('salesDay');
  }

  private salesDayService = inject(SalesDayService);
  public createSalesDayEnabled = false;
  createSalesDayClicked(selectedDate: string) {
    console.log("Date: " + selectedDate);

    // Parse the string to create a Date object
    const dateObject = new Date(selectedDate);

    // Format the date to "dd.MM.yyyy HH:mm:ss"
    const formattedDate = `${String(dateObject.getDate()).padStart(2, '0')}.${String(dateObject.getMonth() + 1).padStart(2, '0')}.${dateObject.getFullYear()} ${String(dateObject.getHours()).padStart(2, '0')}:${String(dateObject.getMinutes()).padStart(2, '0')}:${String(dateObject.getSeconds()).padStart(2, '0')}`;

    console.log("Formatted Date: " + formattedDate);

    const salesDay = {
      name: this.nameForSalesDay,
      dateString: formattedDate,
      oxes: [],
    } as SalesDayDto;
    console.log(salesDay);
    this.salesDayService.apiSalesDayAddSalesDayPost(salesDay).subscribe(
      (x) => {
        console.log('salesDay sent to DB');
        this.dataService.loadSalesDaysFromBackend();
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
    this.router.navigateByUrl('salesDaysOverview');
  }
}