import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,FormsModule,MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  private router = inject(Router);
  activeLink: string = 'home';

  handleNavLinkClick(link: string) {
    this.activeLink = link;
    console.log(link)
    if (link == "dashboard") {
      this.router.navigateByUrl('dashboard');
      //weiterleitung funktioniert nicht
      console.log("forwart do dashboard")
    } else if (link == "home") {
      //weiterleitung funktioniert nicht
      console.log("forwart do home")
    } else if (link == "salesDays") {
      //weiterleitung aktiviert
      this.router.navigateByUrl('salesDaysOverview');
    } else if (link == "customers") {
      //weiterleitung aktiviert
      this.router.navigateByUrl('customers');
      //console.log("forwart do dashboard")
    } else if (link == "stockOverview") {
      //weiterleitung aktiviert
      this.router.navigateByUrl('stockOverview');
      //console.log("forwart do dashboard")
    }
  }
}
