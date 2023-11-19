import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sales-day',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-day.component.html',
  styleUrl: './sales-day.component.scss'
})
export class SalesDayComponent {
      public dataService = inject(DataService);
}
