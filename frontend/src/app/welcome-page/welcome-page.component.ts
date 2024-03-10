import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent implements OnInit {
  welcomeText: string = '';
  currentIndex: number = 0;
  originalText: string = 'Willkommen Karin';

  ngOnInit(): void {
    setInterval(() => this.animation(), 200);
  }

  animation(): void {
    if (this.currentIndex < this.originalText.length) {
      this.welcomeText += this.originalText.charAt(this.currentIndex);
      this.currentIndex++;
    }
  }
}