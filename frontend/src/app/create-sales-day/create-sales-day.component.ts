import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { CustomerDto, CustomerService, SalesDayService } from '../swagger';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SalesDayDto } from '../swagger';




@Component({
  selector: 'app-create-sales-day',
  standalone: true, 
  imports: [HttpClientModule,CommonModule,MatFormFieldModule, MatInputModule, MatDatepickerModule,FormsModule, MatNativeDateModule],
  providers:[SalesDayService,CustomerService],
  templateUrl: './create-sales-day.component.html',
  styleUrl: './create-sales-day.component.scss'
})
export class CreateSalesDayComponent {
  
  private router= inject(Router);
  private dataService = inject(DataService)
  private salesDayService= inject(SalesDayService);
  private customerService= inject(CustomerService);
  public createSalesDayEnabled= false;

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  
    console.log(`${event.value}`);
    console.log(`${event.value}`);
    this.dataService.salesDayDateString.set(`${event.value}`)
    this.createSalesDayEnabled=true;
  }





  createSalesDayClicked(dayName: string) {
        
    
    const salesDay= {name:dayName,dateString:this.dataService.salesDayDateString()} as SalesDayDto;
    console.log(salesDay);
    this.salesDayService.apiSalesDayAddSalesDayPost(salesDay).subscribe(x=>{
      console.log("salesDay sent to DB")
      this.dataService.loadSalesDaysFromBackend();
    },error=>{
      console.error("Error: ",error)
    }
    );
    console.log("added");
    // this.dataService.salesDayName.set(dayName);
    this.router.navigateByUrl('salesDaysOverview')
     
  }
  
}
