import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Dropdown } from 'flowbite'; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule,CommonModule, RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private router = inject(Router);

  customersClicked() {
    this.router.navigateByUrl('customers');
    console.log("customers clicked")
  }
homeClicked() {
  // this.router.navigateByUrl('Home');
    console.log("home clicked")
}



salesDaysOverviewClick(){
  this.router.navigateByUrl('salesDaysOverview');
    console.log("salesDaysOverview clicked")
}


  title = 'frontend';
}
