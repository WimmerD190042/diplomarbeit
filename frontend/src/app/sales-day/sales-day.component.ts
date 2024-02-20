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
  SalesDayService,
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
import { Observable, map, startWith, switchMap } from 'rxjs';
import { of } from 'rxjs';
import { Router } from '@angular/router';

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
  public salesDayService = inject(SalesDayService);
  public router = inject(Router);

  //TODO: Preis für alle ändern -> Wimmer seine Aufgabe
  showOxInput: boolean = false;
  showPlusButton: boolean = true;

  oxName: string = '';
  oxes = signal<string[]>([]);
  price: number = 51;
  deposit: number = 1.0;
  quantity: number = 1.0;
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
  allMeatPiecesSearch: string[] = ['Alle Teilstücke'];
  filteredAllMeatPiecesSearch: Observable<string[]> | undefined;
  //kunde search
  allCustomerSearch: string[] = ['Alle Kunden'];
  customerList: Observable<string[]> | undefined;
  //rest
  selectedCustomerId: Number = -1;
  addSelectedCustomerId: Number = 0;

  ngOnInit() {
    //Load All Orders:
    this.orderService
      .orderOrdersForSalesDayGet(this.dataService.selectedSalesDay.value.id)
      .subscribe((x) => {
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

    //get ALl OXES
    this.getOxes();
   
  }

  getOxes(){
    this.salesDayService
    .apiSalesDayGetOxesGet(this.dataService.selectedSalesDay.value.id)
    .subscribe((x) => {
      this.oxes.set(x);
      console.log('oxes:', x);
    });
  }

  addOx() {
    if (this.oxName.trim() !== '') {
      this.salesDayService
        .apiSalesDayAddOxPost(
          this.dataService.selectedSalesDay.value.id,
          this.oxName
        )
        .subscribe((x) => {
          console.log('ox added');
          console.log(this.oxes());
          this.dataService.loadSalesDaysFromBackend();
          this.getOxes();
        });
    }
  }

  //Teilstücke Search
  onMeatPieceSelectedMat(event: MatAutocompleteSelectedEvent): void {
    if (event.option.viewValue === 'Alle Teilstücke') {
      this.orderService
        .orderOrdersForSalesDayGet(this.dataService.selectedSalesDay.value.id)
        .subscribe((x) => {
          this.orders.set(x);
          this.filterOrders.set(x);
        });
    }
    const filteredMeatPiece = this.orders().filter((order: OrderDto) => {
      return (
        order.meatPieceName &&
        order.meatPieceName.includes(event.option.viewValue)
      );
    });
    this.filterOrders.set(filteredMeatPiece);
  }

  //Kunde Search
  onCustomerSelectMat(event: MatAutocompleteSelectedEvent): void {
    if (event.option.viewValue === 'Alle Kunden') {
      this.orderService
        .orderOrdersForSalesDayGet(this.dataService.selectedSalesDay.value.id)
        .subscribe((x) => {
          this.orders.set(x);
          this.filterOrders.set(x);
        });
    }
    const filteredCustomer = this.orders().filter((order: OrderDto) => {
      return (
        order.customerName &&
        order.customerName.includes(event.option.viewValue)
      );
    });
    console.log('event:' + event.option.value);
    this.filterOrders.set(filteredCustomer);
  }

  onNoteChanged() {
    const filteredNotesOrders = this.orders().filter((order: OrderDto) => {
      return order.notes && order.notes.includes(this.notesSearchTerm);
    });
    this.filterOrders.set(filteredNotesOrders);
  }

  //Export funktion
  exportButtonClick(): void {
    var csvData = 'Kunde;Kategorie;Menge;Anmerkung\n';
    for (var i = 0; i < this.filterOrders().length; i++) {
      const customerId = this.filterOrders().at(i)?.customerName;
      const meatPieceName = this.filterOrders().at(i)?.meatPieceName;
      const amount = this.filterOrders().at(i)?.amount;
      const note = this.filterOrders().at(i)?.notes;
      csvData += `${customerId};${meatPieceName};${amount}kg;${note}\n`;
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
      this.orderService
        .orderOrdersForSalesDayGet(this.dataService.selectedSalesDay.value.id)
        .subscribe((x) => {
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
  toggleOxInput() {
    this.showOxInput = !this.showOxInput;
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
    const dateString = new Date().toISOString();

    this.categoryService
      .apiCategoryMeatPieceByIdGet(this.selectedMeatPiece.id)
      .pipe(
        switchMap((meatPiece) => {
          const kgPrice = meatPiece.pricePerKg;
          const totalPrice = this.quantity * kgPrice!;
          console.log('totalPrice: ', totalPrice);

          const order = {
            customerId: this.addSelectedCustomerId as number,
            dateString: dateString,
            notes: this.notes,
            meatPieceId: this.selectedMeatPiece.id,
            salesDayId: this.dataService.selectedSalesDay.value.id,
            amount: this.quantity,
            paidStatus: 'false',
            price: totalPrice,
            deposit: this.deposit,
          } as OrderDto;

          return this.orderService.orderOrderPost(order);
        })
      )
      .subscribe(
        (x) => {
          console.log('Order sent to DB');
          console.log(x);
          this.dataService.loadSalesDaysFromBackend();
          this.customerChanged();
        },
        (error) => {
          console.error('Error: ', error.error);
        }
      );
  }
  moveToSingleCustomer(customerId: number) {
    const customer = this.dataService
      .customers()
      .find((c) => c.id === customerId);
    this.dataService.selectedCustomer.next(customer!);
    this.router.navigateByUrl(`singleCustomer`);
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
