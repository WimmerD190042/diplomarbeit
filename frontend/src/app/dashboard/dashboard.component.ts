import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentOrdersComponent } from './recent-orders/recent-orders.component';
import { StatisticsComponent } from './statistics/statistics.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RecentOrdersComponent, StatisticsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
