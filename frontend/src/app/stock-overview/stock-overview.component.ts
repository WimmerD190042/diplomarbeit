import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { CategoryDto, CategoryService } from '../swagger';
import { SingleCategoryInfoComponent } from './single-category-info/single-category-info.component';

@Component({
  selector: 'app-stock-overview',
  standalone: true,
  imports: [CommonModule,SingleCategoryInfoComponent],
  templateUrl: './stock-overview.component.html',
  styleUrl: './stock-overview.component.scss'
})
export class StockOverviewComponent  {
categoryClicked(category: CategoryDto) {
  console.log("categoryClicked " + category.name);
 

}
      
public dataService = inject(DataService);
public categoryService= inject(CategoryService);


 
 


}
