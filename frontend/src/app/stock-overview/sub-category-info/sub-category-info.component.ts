import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService, SubCategoryDto } from '../../swagger';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../data.service';
import { CategoryOverviewComponent } from '../category-overview/category-overview.component';
import { Router } from '@angular/router';

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
  public router = inject(Router);
  public stockInput: number = 0;

  @Input() subCategory: SubCategoryDto = {};
  selectedSubCategoryId: number = 0;
  selectedSubCategoryName: string = '';

  editMode = false;

  editClicked() {
    this.editMode = true;
    this.dataService.setSelectedSubCategory(this.subCategory);
  }

  saveClicked() {
    this.editMode = false;
    this.stockInput = this.subCategory.stock!;
    this.categoryService
      .apiCategoryUpdateStockForSubCategoryPut(
        this.subCategory.id,
        this.stockInput
      )
      .subscribe(() => {
        this.dataService.getSubCategories();
        console.log('Stock updated');
      });
  }

  subCategoryClicked() {
    this.dataService.setSelectedSubCategory(this.subCategory);
  }

  addStock() {
    console.log('id' + this.dataService.selectedSubCategory().id);

    console.log(this.dataService.selectedSubCategory().name + 'clicked');
    this.categoryService
      .apiCategoryAddStockForSubCategoryPut(
        this.dataService.selectedSubCategory().id,
        this.stockInput
      )
      .subscribe(() => {
        this.dataService.getSubCategories();
        console.log('Stock added');
      });
  }
}
