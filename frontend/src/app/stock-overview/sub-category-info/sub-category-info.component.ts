import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryDto } from '../../swagger';

@Component({
  selector: 'app-sub-category-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sub-category-info.component.html',
  styleUrl: './sub-category-info.component.scss'
})
export class SubCategoryInfoComponent {
    @Input() subCategory: SubCategoryDto = {};

    
}
