import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { CategoryDto, CategoryService, CustomerDto, MeatPieceDto, Order, SubCategoryDto } from '../swagger';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verkaufstag-kunde',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verkaufstag-kunde.component.html',
  styleUrl: './verkaufstag-kunde.component.scss'
})
export class VerkaufstagKundeComponent {
  public changeDetectorRef = inject(ChangeDetectorRef);
  public dataService = inject(DataService);
  public categoryService = inject(CategoryService);

  notes: string = "";
  selectedCustomerId: CustomerDto = {};

  selectedCategory: CategoryDto = {};
  selectedSubCategory: SubCategoryDto = {};
  selectedMeatPiece: MeatPieceDto = {};

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
    const dateObject = new Date();
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    var dateNow = dateObject.toLocaleDateString('de-DE', options);

    const order = {
      customerId: this.selectedCustomerId,
      date: dateNow,
      notes: this.notes,
      meatPieceId: this.selectedMeatPiece.id,

    } as Order;
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

  customerChanged() {
    throw new Error('Method not implemented.');
  }
}
