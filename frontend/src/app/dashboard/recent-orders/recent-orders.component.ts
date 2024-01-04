import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { Order, OrderDto, OrderService } from '../../swagger';

@Component({
  selector: 'app-recent-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-orders.component.html',
  styleUrl: './recent-orders.component.scss',
})
export class RecentOrdersComponent {
  public orderService = inject(OrderService);
  public recentOrders = signal<Order[]>([]);

  ngOnInit(): void {
    this.orderService.orderOrdersGet().subscribe((x) => {
      const firstTenOrders = x.slice(0, 10);
      this.recentOrders.set(firstTenOrders);
      console.log('Recent Orders loaded');
      console.log(this.recentOrders());
    });
  }
}
