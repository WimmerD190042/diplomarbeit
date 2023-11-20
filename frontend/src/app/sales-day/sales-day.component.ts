import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sales-day',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-day.component.html',
  styleUrl: './sales-day.component.scss'
})
export class SalesDayComponent {
customerChanged() {
  
}
  public dataService = inject(DataService);


   addNameField(button:any) {
    var td = button.parentNode;
    var tr = td.parentNode;
    var input = document.createElement("input");
    input.type = "text";
    input.className = "form-control form-control-sm flex-grow-1";
    input.style.marginRight = "10px";
    tr.insertBefore(input, td);
    tr.classList.add("d-flex");
  }
     
}
