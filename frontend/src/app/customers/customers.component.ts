import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { CustomerDto, CustomerService } from '../swagger';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  editingCustomer: any = null;
  public dataService = inject(DataService);
  public customerService= inject(CustomerService);


  saveChanges(customer : CustomerDto) {
    console.log("eoeoeoeo")

    this.editingCustomer = null;
      this.customerService.apiCustomerEditCustomerPut(customer).subscribe(x=>{
        console.log(`Customer ${customer.name} edited`)
      });
  }

deleteCustomer(_t10: CustomerDto) {

}
editCustomer(customer: CustomerDto) {
  this.editingCustomer = customer;

}
    
}
