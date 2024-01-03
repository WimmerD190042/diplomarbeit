import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Dropdown } from 'flowbite';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterOutlet, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

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
      //console.log("forwart do salesDays")
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
  title = 'Dashboard';
}
