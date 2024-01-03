import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { CategoryDto, CategoryService, CustomerDto, MeatPieceDto, OrderDto, OrderService, SubCategoryDto } from '../swagger';
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
  changeDetection: ChangeDetectionStrategy.Default
})
export class SalesDayComponent {

  public changeDetectorRef = inject(ChangeDetectorRef);
  public dataService = inject(DataService);
  public categoryService = inject(CategoryService);
  public orderService = inject(OrderService);

  public orders = signal<OrderDto[]>([]);

  

  quantity: number = 0.0;
  notes: string = "";
  selectedCustomerId: Number = 0;

  selectedCategory: CategoryDto = {};
  selectedSubCategory: SubCategoryDto = {};
  selectedMeatPiece: MeatPieceDto = {};

  //button
  //exportButton

  exportButton = document.getElementById("exportButton");
  handleButtonClick(): void {
    console.log('Export started');
        //todo: Aktuelle Liste aus Backend holen

        // Holen der Liste
        //let meineListe: string[] = ["a","b","c"];
        //var meineListe = document.getElementById("meineListe").getElementsByTagName("li");
        // Erstellen der CSV-Daten
        var csvData = "Liste\n";
        for (var i = 0; i < this.orders.length; i++) {
          csvData += this.orders()[i].customerId + "\n";
        }
        // Erstellen eines Blob-Objekts
        var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        // Erstellen eines Download-Links
        var link = document.createElement("a");
        // Verknüpfen des Download-Links mit dem Blob
        link.href = window.URL.createObjectURL(blob);
        // Festlegen des Dateinamens
        link.download = "verkaufstag.csv";
        // Klicken auf den Link, um den Download auszulösen
        link.click();
    
  }


  customerChanged() {
    console.log("changingchangingchanging")
    this.orderService.orderOrdersByCustomerGet(this.selectedCustomerId as number).subscribe(x => {
      this.orders.set(x);
      console.log("orders: ", this.orders);
    });
  }

  onMeatPieceSelected(meatpiece: MeatPieceDto) {
    console.log('meatpiece:', meatpiece);
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
    console.log("addOrder clicked");
    const dateString = new Date().toISOString();
      

      const order = {
        customerId: this.selectedCustomerId as number,
        dateString: dateString,
        notes: this.notes,
        meatPieceId: this.selectedMeatPiece.id,
        salesDayId: this.dataService.selectedSalesDay.value.id,
        amount:this.quantity,
        paidStatus:"false",

        
        
      } as OrderDto;
        this.orderService.orderOrderPost(order).subscribe(x=>{
          console.log("Order sent to DB")
          this.dataService.loadSalesDaysFromBackend();
            this.customerChanged();
        },error=>{
          console.error("Error: ",error.error)
        });
      console.log(order);
    console.log(this.selectedMeatPiece.name);
  }

  addNameField(button: any) {
    var td = button.parentNode;
    var tr = td.parentNode;
    var input = document.createElement("input");
    input.type = "text";
    input.className = "form-control form-control-sm flex-grow-1";
    input.style.marginRight = "10px";
    tr.insertBefore(input, td);
    tr.classList.add("d-flex");
  }
}
