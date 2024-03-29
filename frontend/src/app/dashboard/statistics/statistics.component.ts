import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { OrderService } from '../../swagger';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent {
  public dataService = inject(DataService);
  public orderService = inject(OrderService);

  unpaidOrders: number = 0;
  totalSales: number = 0;
  revenue: number = 0;
  test: Date = new Date();
  selectedEndDate: string = new Date().toString();
  selectedStartDate: string = new Date().toString();


  async ngOnInit() {
    this.getTotalOrders();
    this.getRevenue();
    this.getUnpaidOrders();
    const today = new Date();
    this.selectedEndDate = this.formatDate(today);
    this.selectedStartDate = this.formatDate(today);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${this.pad(month)}-${this.pad(day)}`;
  }

  private pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }

  getUnpaidOrders() {
    this.orderService.orderUnpaidOrdersCountGet(this.selectedStartDate, this.selectedEndDate).subscribe((data) => {
      this.unpaidOrders = data;
    });
  }

  getTotalOrders() {
    this.orderService.orderOrdersCountGet(this.selectedStartDate, this.selectedEndDate).subscribe((data) => {
      this.totalSales = data;
    });
  }

  getRevenue() {
    this.orderService.orderRevenueForTimeSpanGet(this.selectedStartDate, this.selectedEndDate).subscribe((data) => {
      this.revenue = data;
    });
  }

  dateChanged() {
    this.getUnpaidOrders();
    this.getTotalOrders();
    this.getRevenue();
    this.dataService.loadDashboardOrdersFromBackend(this.selectedStartDate, this.selectedEndDate);
  }
}