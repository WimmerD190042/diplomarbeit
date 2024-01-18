import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { CustomerDto, CustomerService } from '../swagger';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  editingCustomer: any = null;

  public dataService = inject(DataService);
  public customerService = inject(CustomerService);
  router = inject(Router);

  moveToSingleCustomer(customer: CustomerDto) {
    this.dataService.selectedCustomer.next(customer);
    this.router.navigateByUrl(`singleCustomer`);
  }

  createCustomerFromInput(customerName: string, customerAddress: string) {
    const customer = {
      name: customerName,
      address: customerAddress,
    } as CustomerDto;
    this.customerService.apiCustomerAddNewCustomerPost(customer).subscribe(
      (x) => {
        console.log('Customer sent to DB');
        this.dataService.loadCustomersFromBackend();
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
    console.log('added');
    customerName = '';
  }

  saveChanges(customer: CustomerDto) {
    console.log('eoeoeoeo');

    this.editingCustomer = null;
    this.customerService.apiCustomerEditCustomerPut(customer).subscribe((x) => {
      console.log(`Customer ${customer.name} edited`);
    });
  }

  deleteCustomer(customer: CustomerDto) {
    this.customerService
      .apiCustomerDeleteCustomerDelete(customer)
      .subscribe((x) => {
        console.log(`Customer ${customer.name} deleted`);
        this.dataService.loadCustomersFromBackend();
      });
  }
  editCustomer(customer: CustomerDto) {
    this.editingCustomer = customer;
  }
}
