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
throw new Error('Method not implemented.');
}
private router = inject(Router);

verkaufstagClicked() {
    this.router.navigateByUrl('Verkaufstag');
    console.log("clicked")
}
  title = 'frontend';
}
