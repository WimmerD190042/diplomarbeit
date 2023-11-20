import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';


@Component({
  selector: 'app-create-sales-day',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './create-sales-day.component.html',
  styleUrl: './create-sales-day.component.scss'
})
export class CreateSalesDayComponent {

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  
    console.log(`${event.value}`);
    console.log(`${event.value}`);
    this.dataService.salesDayDateString.set(`${event.value}`)
  }
  private router= inject(Router);
  private dataService = inject(DataService)


  createSalesDayClicked(dayName: string) {
      this.dataService.salesDayName.set(dayName);
    this.router.navigateByUrl('salesDay')
      console.log("eoeoeo")
  }
  
}
