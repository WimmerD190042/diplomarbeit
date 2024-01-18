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
}
