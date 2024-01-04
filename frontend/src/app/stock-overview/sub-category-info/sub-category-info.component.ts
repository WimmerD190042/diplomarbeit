import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService, SubCategoryDto } from '../../swagger';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../data.service';
import { CategoryOverviewComponent } from '../category-overview/category-overview.component';

@Component({
  selector: 'app-sub-category-info',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './sub-category-info.component.html',
  styleUrl: './sub-category-info.component.scss',
})
export class SubCategoryInfoComponent {
  public categoryService = inject(CategoryService);
  public dataService = inject(DataService);
  public stockInput: number = 0;

  @Input() subCategory: SubCategoryDto = {};
  selectedSubCategoryId: number = 0;
  selectedSubCategoryName: string = '';

  subCategoryClicked() {
    this.dataService.setSelectedSubCategory(this.subCategory);
  }

  addStock() {
    console.log('id' + this.dataService.selectedSubCategory().id);

    console.log(this.dataService.selectedSubCategory().name + 'clicked');
    this.categoryService
      .apiCategoryUpdateStockForSubCategoryPut(
        this.dataService.selectedSubCategory().id,
        this.stockInput
      )
      .subscribe(() => {
        this.dataService.getSubCategories();
        console.log('Stock added');
      });
  }
}
