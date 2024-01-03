import { Component, Input, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryInfoComponent } from '../sub-category-info/sub-category-info.component';
import { CategoryService, SubCategoryDto } from '../../swagger';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-category-overview',
  standalone: true,
  imports: [CommonModule,SubCategoryInfoComponent],
  templateUrl: './category-overview.component.html',
  styleUrl: './category-overview.component.scss'
})
export class CategoryOverviewComponent implements OnInit {
  public categoryService= inject(CategoryService);
  public dataService= inject(DataService);
     
     subCategories= signal<SubCategoryDto[]>([]);
     ngOnInit(): void {
        this.categoryService.apiCategorySubCategoriesByCategoryGet(this.dataService.selectedCategory.value.id).subscribe(subCategories =>{
           this.subCategories.set(subCategories)
          console.log("subCategories: ",this.subCategories());
     });
    }

}
