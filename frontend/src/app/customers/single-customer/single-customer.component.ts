import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDto, OrderService } from '../../swagger';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-single-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-customer.component.html',
  styleUrl: './single-customer.component.scss'
})
export class SingleCustomerComponent implements OnInit {
  
 public customerOrders= signal<OrderDto[]>([]);
  orderService= inject(OrderService);
  dataService= inject(DataService);
    ngOnInit(): void {
        this.orderService.orderOrdersByCustomerGet(this.dataService.selectedCustomer.value.id).subscribe((orders) => {
            this.customerOrders.set(orders);
        });
    }

    deleteOrder(Order: OrderDto) {
      this.orderService.orderOrderDelete(Order.id as number).subscribe((x) => {
        console.log('Order deleted');
        this.dataService.loadSalesDaysFromBackend();
      });
    }
    
} 
