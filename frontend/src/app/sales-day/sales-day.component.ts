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
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, map, startWith } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-sales-day',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
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

  //TODO: Preis für alle ändern -> Wimmer seine Aufgabe
  price: number = 1;
  deposit: number = 0.0;
  quantity: number = 0.0;
  notes: string = '';
  searchSelectedCustomerId: Number = 0;
  selectedPartsId: Number = 0;
  selectedCategory: CategoryDto = {};
  selectedSubCategory: SubCategoryDto = {};
  selectedMeatPiece: MeatPieceDto = {};
  partsSearchTerm: string = '';
  notesSearchTerm: string = '';
  controlParts = new FormControl();
  controlCustomer = new FormControl();
  //teilstücke search
  allMeatPiecesSearch: string[] = [];
  filteredAllMeatPiecesSearch: Observable<string[]> | undefined;
  //kunde search
  allCustomerSearch: string[] = ["All Customers"];
  customerList: Observable<string[]> | undefined;
  //rest
  selectedCustomerId: Number = -1;
  addSelectedCustomerId: Number = 0;


  ngOnInit() {
    //Load All Custers:
    this.orderService.orderOrdersForSalesDayGet(this.dataService.selectedSalesDay.value.id).subscribe((x) => {
      this.orders.set(x);
      this.filterOrders.set(x);
    });

    //Load Teilstücke
    this.dataService.loadMeatPiecedFromBackend();
    var allMeatPieces = this.dataService.allMeatPieces();
    allMeatPieces.forEach((singleMeatPiece) => {
      if (singleMeatPiece.name !== null && singleMeatPiece.name !== undefined) {
        this.allMeatPiecesSearch.push(singleMeatPiece.name);
      }
    });

    //Load Customers
    this.dataService.loadCustomersFromBackend();
    var allCustomers = this.dataService.customers();
    allCustomers.forEach((singleCustomer) => {
      if (singleCustomer.name !== null && singleCustomer.name !== undefined) {
        this.allCustomerSearch.push(singleCustomer.name);
      }
    });

    //Teilstücke Search
    this.filteredAllMeatPiecesSearch = this.controlParts.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterParts(value || ''))
    );

    //Kunden Search
    this.customerList = this.controlCustomer.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterCustomers(value || ''))
    );

    //get ALl Orders -> ToDo brauchst du das noch?
    this.dataService.loadOrdersOfSalesDayFromBackend(1);
    var list = this.dataService.allOrders();
    console.log('list length: ' + list.length);
    console.log(this.dataService.allOrders);
  }

  //Teilstücke Search
  onMeatPieceSelectedMat(event: MatAutocompleteSelectedEvent): void {
    const filteredMeatPiece = this.orders().filter((order: OrderDto) => {
      return order.meatPieceName && order.meatPieceName.includes(event.option.viewValue);
    });
    this.filterOrders.set(filteredMeatPiece);
  }
  
  //Kunde Search
  onCustomerSelectMat(event: MatAutocompleteSelectedEvent): void {
    if(event.option.viewValue === "All Customers") {
      this.orderService.orderOrdersForSalesDayGet(this.dataService.selectedSalesDay.value.id).subscribe((x) => {
        this.orders.set(x);
        this.filterOrders.set(x);
      });
    }
    const filteredCustomer = this.orders().filter((order: OrderDto) => {
      return order.customerName && order.customerName.includes(event.option.viewValue);
    });
    console.log("event:" + event.option.value);
    this.filterOrders.set(filteredCustomer);
    /*
    if (this.searchSelectedCustomerId == -1) {
      this.orderService.orderOrdersForSalesDayGet(this.dataService.selectedSalesDay.value.id).subscribe((x) => {
        this.orders.set(x);
        this.filterOrders.set(x);
      });
    } else {
      this.orderService
      .orderOrdersFromCustomerForSalesDayGet(
        this.searchSelectedCustomerId as number,
        this.dataService.selectedSalesDay.value.id
      )
      .subscribe((x) => {
        this.orders.set(x);
        this.filterOrders.set(x);
      });
    }
    */
  }

  onNoteChanged() {
    const filteredNotesOrders = this.orders().filter((order: OrderDto) => {
      return order.notes && order.notes.includes(this.notesSearchTerm);
    });
    this.filterOrders.set(filteredNotesOrders);
  }

  exportButtonClick(): void {
    var csvData = 'Kunde;Menge;Anmerkung\n';
    for (var i = 0; i < this.filterOrders().length; i++) {
      const customerId = this.filterOrders().at(i)?.customerName;
      const meatPieceId = this.filterOrders().at(i)?.meatPieceName;
      const note = this.filterOrders().at(i)?.notes;
      csvData += `${customerId};${meatPieceId};${note}\n`;
    }
    var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var salesDay = this.dataService.selectedSalesDay.value.name;
    link.download = 'verkaufstag' + salesDay + '.csv';
    link.click();
  }

  customerChanged() {
    if (this.searchSelectedCustomerId == -1) {
      this.orderService.orderOrdersForSalesDayGet(this.dataService.selectedSalesDay.value.id).subscribe((x) => {
        this.orders.set(x);
        this.filterOrders.set(x);
      });
    } else {
      this.orderService
      .orderOrdersFromCustomerForSalesDayGet(
        this.searchSelectedCustomerId as number,
        this.dataService.selectedSalesDay.value.id
      )
      .subscribe((x) => {
        this.orders.set(x);
        this.filterOrders.set(x);
      });
    }
  }

  partsChanged() {
    console.log('parts changed');
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
            customerId: this.addSelectedCustomerId as number,
            dateString: dateString,
            notes: this.notes,
            meatPieceId: this.selectedMeatPiece.id,
            salesDayId: this.dataService.selectedSalesDay.value.id,
            amount: this.quantity,
            paidStatus: 'false',
            price: this.price,
            deposit: this.deposit,
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

  //Search Teilstücke
  private filterParts(value: string): string[] {
    const filterValue = this.normalizeParts(value);
    return this.allMeatPiecesSearch.filter((allMeatPiecesSearch) =>
      this.normalizeParts(allMeatPiecesSearch).includes(filterValue)
    );
  }

  //Search Teilstücke
  private normalizeParts(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  //Search Customers
  private filterCustomers(value: string): string[] {
    const filterValue = this.normalizeCustomers(value);
    return this.allCustomerSearch.filter((allCustomerSearch) =>
      this.normalizeCustomers(allCustomerSearch).includes(filterValue)
    );
  }

  //Search Customers
  private normalizeCustomers(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
