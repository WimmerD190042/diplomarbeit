import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { CategoryDto, CategoryService, CustomerDto, MeatPieceDto, SubCategoryDto } from '../swagger';
import { Order } from '../swagger';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { TeilstuckeComponent } from '../teilstucke/teilstucke.component';
import { VerkaufstagKundeComponent } from '../verkaufstag-kunde/verkaufstag-kunde.component';

@Component({
  selector: 'app-sales-day',
  standalone: true,
  imports: [CommonModule, FormsModule, VerkaufstagKundeComponent, TeilstuckeComponent],
  templateUrl: './sales-day.component.html',
  styleUrl: './sales-day.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class SalesDayComponent {
}