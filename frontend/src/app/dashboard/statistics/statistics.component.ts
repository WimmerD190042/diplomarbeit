import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { OrderService } from '../../swagger';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent {
  public dataService = inject(DataService);
  public orderService = inject(OrderService);

  totalSales: number = 0;
  revenue: number = 0;

  async ngOnInit() {
    this.orderService.orderOrdersGet().subscribe(async (data) => {
      this.totalSales = data.length;
      this.revenue = await this.dataService.getRevenue();
    });
  }
}