import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { CategoryDto, CategoryService } from '../swagger';
import { SingleCategoryInfoComponent } from './single-category-info/single-category-info.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-overview',
  standalone: true,
  imports: [CommonModule, SingleCategoryInfoComponent],
  templateUrl: './stock-overview.component.html',
  styleUrl: './stock-overview.component.scss',
})
export class StockOverviewComponent {
  public dataService = inject(DataService);
  public categoryService = inject(CategoryService);
  public router = inject(Router);

  categoryClicked(category: CategoryDto) {
    console.log('categoryClicked ' + category.name);
    this.dataService.selectedCategory.next(category);
    this.router.navigateByUrl(`category-overview/${category.id}`);
  }

  categories: CategoryDto[] = [
    { name: 'Category1' },
    { name: 'Category2' },
    // Add more categories as needed
  ];

  selectedCategory: CategoryDto | null = null;

  getItemsForCategory(category: CategoryDto): string[] {
    // Replace this with your logic to fetch items for the given category
    return [`Item1 for ${category.name}`, `Item2 for ${category.name}`, 'Item3', 'Item4', 'Item5'];
  }

  toggleCategory(category: CategoryDto): void {
    if (this.selectedCategory === category) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = category;
    }
  }

  //subkategorie: id3 zb -> SubCategoriesByCategoryId
}