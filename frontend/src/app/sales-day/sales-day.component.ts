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
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-sales-day',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatAutocompleteModule, MatFormFieldModule, ReactiveFormsModule],
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
  selectedCustomerId: Number = 0;
  selectedPartsId: Number = 0;
  selectedCategory: CategoryDto = {};
  selectedSubCategory: SubCategoryDto = {};
  selectedMeatPiece: MeatPieceDto = {};
  partsSearchTerm: string = '';
  notesSearchTerm: string = '';
  control = new FormControl('');
  allMeatPiecesSearch: string[] = [];
  filteredAllMeatPiecesSearch: Observable<string[]> | undefined;

  ngOnInit() {
    this.dataService.loadMeatPiecedFromBackend();
    var allMeatPieces = this.dataService.allMeatPieces();
    allMeatPieces.forEach(meatPiece => {
      if (meatPiece.name !== null && meatPiece.name !== undefined) {
        this.allMeatPiecesSearch.push(meatPiece.name);
      }
    });

    this.filteredAllMeatPiecesSearch = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  onPartsChanged() {
    //TODO: mit anfangsbuchstaben suchen? soll ich das überhaupt machen?
  }

  onMeatPieceSelectedMat(event: MatAutocompleteSelectedEvent): void {
    const selectedMeatPiece = event.option.viewValue;
    console.log('Selected Meat Piece:', selectedMeatPiece);
  
    //TODO wenn eins ausgewählt ist, sollen die Listen gefilter werden
    //viel spaß :)
  }

  onNoteChanged() {
    const filteredNotesOrders = this.orders().filter((order: OrderDto) => {
      return order.notes && order.notes.includes(this.notesSearchTerm);
    });
    this.filterOrders.set(filteredNotesOrders);
  }

  exportButtonClick(): void {
    var csvData = 'Customer;Menge;Anmerkung\n';
    for (var i = 0; i < this.filterOrders().length; i++) {
      const customerId = this.filterOrders().at(i)?.customerId;
      const meatPieceId = this.filterOrders().at(i)?.meatPieceId;
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

  partsChanged() {
    console.log("parts changed");
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

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.allMeatPiecesSearch.filter(allMeatPiecesSearch => this._normalizeValue(allMeatPiecesSearch).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}