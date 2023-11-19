import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
homeClicked() {
  // this.router.navigateByUrl('Home');
    console.log("clicked")
}
private router = inject(Router);

newSalesDayClick() {
    this.router.navigateByUrl('newSalesDay');
    console.log("clicked")
}
  title = 'frontend';
}
