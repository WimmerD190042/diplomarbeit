import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateSalesDayComponent } from './create-sales-day/create-sales-day.component';
import { SalesDayComponent } from './sales-day/sales-day.component';
import { SalesDaysOverviewComponent } from './sales-days-overview/sales-days-overview.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockOverviewComponent } from './stock-overview/stock-overview.component';
import { CategoryOverviewComponent } from './stock-overview/category-overview/category-overview.component';
import { SingleCustomerComponent } from './customers/single-customer/single-customer.component';

export const routes: Routes = [
  { path: 'singleCustomer', component: SingleCustomerComponent },
  { path: 'category-overview/:id', component: CategoryOverviewComponent },
  { path: 'stockOverview', component: StockOverviewComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'salesDaysOverview', component: SalesDaysOverviewComponent },
  { path: 'newSalesDay', component: CreateSalesDayComponent },
  { path: 'salesDay', component: SalesDayComponent },
  { path: 'Home', component: AppComponent },
  { path: '**', component: WelcomePageComponent },
];
