import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private router = inject(Router);
  activeLink: string = 'home';

  handleNavLinkClick(link: string) {
    this.activeLink = link;
    console.log(link);
    if (link == 'dashboard') {
      this.router.navigateByUrl('dashboard');
    } else if (link == 'home') {
      this.router.navigateByUrl('#');
    } else if (link == 'salesDays') {
      this.router.navigateByUrl('salesDaysOverview');
    } else if (link == 'customers') {
      this.router.navigateByUrl('customers');
    } else if (link == 'stockOverview') {
      this.router.navigateByUrl('stockOverview');
    }
  }
}
