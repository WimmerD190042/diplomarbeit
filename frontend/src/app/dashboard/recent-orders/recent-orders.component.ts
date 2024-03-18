import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { Order, OrderDashboardDto, OrderDto, OrderService } from '../../swagger';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recent-orders',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './recent-orders.component.html',
  styleUrl: './recent-orders.component.scss',
})
export class RecentOrdersComponent {
  public orderService = inject(OrderService);
  public recentOrders = signal<OrderDashboardDto[]>([]);

  ngOnInit(): void {
    this.orderService.orderOrdersForDashboardGet().subscribe((x) =>
      this.recentOrders.set(x)
    );
  }

  exportButtonClick() {
    var csvData = 'Customer;Menge;Anmerkung\n';
    this.recentOrders().forEach((order) => {
      const note = order.notes;
      //csvData += `${customerId};${meatPieceId};${note}\n`;
    });
    var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'LetzteBestellungen.csv';
    link.click();
  }
}
