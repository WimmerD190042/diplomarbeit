import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-sales-day',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-sales-day.component.html',
  styleUrl: './create-sales-day.component.scss'
})
export class CreateSalesDayComponent {

  private router= inject(Router);


  createSalesDayClicked() {

    
    this.router.navigateByUrl('salesDay')
      console.log("eoeoeo")
  }
  
}
