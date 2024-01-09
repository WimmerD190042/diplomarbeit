import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import {
  CategoryDto,
  CategoryService,
  CustomerDto,
  MeatPieceDto,
  OrderDto,
  OrderService,
  SubCategoryDto,
} from '../swagger';
import { Order } from '../swagger';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sales-day',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './sales-day.component.html',
  styleUrl: './sales-day.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SalesDayComponent {
  public changeDetectorRef = inject(ChangeDetectorRef);
  public dataService = inject(DataService);
  public categoryService = inject(CategoryService);
  public orderService = inject(OrderService);
  public orders = signal<OrderDto[]>([]);
  public filterOrders = signal<OrderDto[]>([]);

  quantity: number = 0.0;
  notes: string = '';
  selectedCustomerId: Number = 0;
  selectedCategory: CategoryDto = {};
  selectedSubCategory: SubCategoryDto = {};
  selectedMeatPiece: MeatPieceDto = {};
  searchTerm: string = '';

  onSearchChange() {
    const filteredOrders = this.orders().filter((order: OrderDto) => {
      return order.notes && order.notes.includes(this.searchTerm);
    });
    this.filterOrders.set(filteredOrders);
  }

  handleButtonClick(): void {
    var csvData = 'Customer;Menge;Anmerkung\n';
    for (var i = 0; i < this.filterOrders().length; i++) {
      const customerId = this.filterOrders().at(i)?.customerId;
      const meatPieceId = this.filterOrders().at(i)?.meatPieceId;
      csvData += `${customerId};${meatPieceId}\n`;
      
    }
    var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    //TODO: Verkaufstag welcher bei der Datei hinzufügen!
    link.download = 'verkaufstag.csv';
    link.click();
  }

  customerChanged() {
    console.log('heo');

    this.orderService
      .orderOrdersFromCustomerForSalesDayGet(
        this.selectedCustomerId as number,
        this.dataService.selectedSalesDay.value.id
      )
      .subscribe((x) => {
        this.orders.set(x);
        this.filterOrders.set(x);
        console.log('Orders: ', this.orders(), this.filterOrders());
      });
  }

  deleteOrder(Order: OrderDto) {
    this.orderService.orderOrderDelete(Order.id as number).subscribe((x) => {
      console.log('Order deleted');
      this.dataService.loadSalesDaysFromBackend();
      this.customerChanged();
    });
  }

  onMeatPieceSelected(meatpiece: MeatPieceDto) {
    this.selectedMeatPiece = meatpiece;
    console.log('selectedMeatPiece:', this.selectedMeatPiece);
    this.changeDetectorRef.detectChanges();
  }

  onSubCategorySelected(subCategory: SubCategoryDto) {
    this.selectedSubCategory = subCategory;
  }

  onCategorySelected(category: CategoryDto) {
    console.log(category.subCategories);
    this.selectedCategory = category;
  }

  addOrder() {
    const availableStock = this.categoryService
      .apiCategoryGetStockForSubCategoryIdGet(
        this.selectedSubCategory.id as number
      )
      .subscribe((x) => {
        console.log('Stock: ', x);
        if (x < this.quantity) {
          alert('Nicht genügend Fleisch auf Lager!');
          return;
        } else {
          const dateString = new Date().toISOString();

          const order = {
            customerId: this.selectedCustomerId as number,
            dateString: dateString,
            notes: this.notes,
            meatPieceId: this.selectedMeatPiece.id,
            salesDayId: this.dataService.selectedSalesDay.value.id,
            amount: this.quantity,
            paidStatus: 'false',
          } as OrderDto;
          this.orderService.orderOrderPost(order).subscribe(
            (x) => {
              console.log('Order sent to DB');
              this.dataService.loadSalesDaysFromBackend();
              this.customerChanged();
            },
            (error) => {
              console.error('Error: ', error.error);
            }
          );
        }
      });
  }

  addNameField(button: any) {
    var td = button.parentNode;
    var tr = td.parentNode;
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control form-control-sm flex-grow-1';
    input.style.marginRight = '10px';
    tr.insertBefore(input, td);
    tr.classList.add('d-flex');
  }

  //sort
  sortOrder: { column: string; direction: string } = {
    column: '',
    direction: 'asc',
  };

  sortBy(column: string): void {
    this.sortOrder.column = column;
    this.sortOrder.direction =
      this.sortOrder.direction === 'asc' ? 'desc' : 'asc';
    if (column == '#') {
      console.log('Sort after ID (nach unten)');
    } else if (column == 'Kategorie') {
      console.log('Sort after Kategorie (nach unten)');
    } else if (column == 'Menge') {
      console.log('Sort after Menge (nach unten)');
    } else if (column == 'Anmerkung') {
      console.log('Sort after Anmerkung (nach unten)');
    }
  }

  toggleSortDirection(column: string): void {
    if (this.sortOrder.column === column) {
      this.sortOrder.direction =
        this.sortOrder.direction === 'asc' ? 'desc' : 'asc';
      if (column == '#') {
        console.log('Sort after ID (nach oben)');
      } else if (column == 'Kategorie') {
        console.log('Sort after Kategorie (nach oben)');
      } else if (column == 'Menge') {
        console.log('Sort after Menge (nach oben)');
      } else if (column == 'Anmerkung') {
        console.log('Sort after Anmerkung (nach oben)');
      }
    }
  }

  getSortIcon(column: string): string {
    if (this.sortOrder.column === column) {
      return this.sortOrder.direction === 'asc' ? '▲' : '▼';
    }
    return '';
  }
}
