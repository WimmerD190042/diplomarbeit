import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryDto, CategoryService, MeatPieceDto, SubCategoryDto } from '../swagger';
import { DataService } from '../data.service';

@Component({
  selector: 'app-teilstucke',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teilstucke.component.html',
  styleUrl: './teilstucke.component.scss'
})

export class TeilstuckeComponent {
  public changeDetectorRef = inject(ChangeDetectorRef);
  public dataService = inject(DataService);
  public categoryService = inject(CategoryService);

  selectedCategory: CategoryDto = {};
  selectedSubCategory: SubCategoryDto = {};
  selectedMeatPiece: MeatPieceDto = {};

  onCategorySelected(category: CategoryDto) {
    console.log(category.subCategories);
    this.selectedCategory = category;
  }

  onSubCategorySelected(subCategory: SubCategoryDto) {
    this.selectedSubCategory = subCategory;
  }

  onMeatPieceSelected(meatpiece: MeatPieceDto) {
    console.log('meatpiece:', meatpiece);
    this.selectedMeatPiece = meatpiece;
    console.log('selectedMeatPiece:', this.selectedMeatPiece);
    this.changeDetectorRef.detectChanges();
  }
}