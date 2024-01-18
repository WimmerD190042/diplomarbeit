import { AfterViewInit, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { CategoryDto } from '../../swagger';

@Component({
  selector: 'app-single-category-info',
  standalone: true,
  imports: [CommonModule, SingleCategoryInfoComponent],
  templateUrl: './single-category-info.component.html',
  styleUrl: './single-category-info.component.scss',
})
export class SingleCategoryInfoComponent {
  @Input() category: CategoryDto = {};

  public dataService = inject(DataService);

  private categoriesLoaded = false;
}
