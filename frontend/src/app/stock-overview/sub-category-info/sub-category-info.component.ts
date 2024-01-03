import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService, SubCategoryDto } from '../../swagger';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sub-category-info',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './sub-category-info.component.html',
  styleUrl: './sub-category-info.component.scss'
})
export class SubCategoryInfoComponent {

  public categoryService= inject(CategoryService);

    @Input() subCategory: SubCategoryDto = {};
    addStock() {
          this.categoryService.apiCategoryUpdateStockForSubCategoryPut(this.subCategory.id, 1).subscribe(() => {
            console.log("Stock added");
          });
      }
    
}
