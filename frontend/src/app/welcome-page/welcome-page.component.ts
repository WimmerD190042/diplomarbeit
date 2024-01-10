import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit {

 
  i: number = 0;
  welcomeText: string = 'Willkommen Karin';
  speed: number = 150;

  constructor() { }

  ngOnInit(): void {
    this.typeWriteWelcome();
  }

  // Definiere die Funktion typeWriter
  typeWriteWelcome(): void {
    if (this.i < this.welcomeText.length) {
      if(document.getElementById("typewriterWelcome") != null){
        document.getElementById("typewriterWelcome")!.innerHTML += this.welcomeText.charAt(this.i);
        this.i++;
        setTimeout(() => this.typeWriteWelcome(), this.speed);
        console.log("eoeooe")
      }
    
    }
  }

}

