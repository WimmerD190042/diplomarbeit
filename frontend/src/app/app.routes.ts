import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateSalesDayComponent } from './create-sales-day/create-sales-day.component';
import { SalesDayComponent } from './sales-day/sales-day.component';
import { SalesDaysOverviewComponent } from './sales-days-overview/sales-days-overview.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { CustomersComponent } from './customers/customers.component';

export const routes: Routes = [
    {path:'customers',component:CustomersComponent},
    {path:'salesDaysOverview',component:SalesDaysOverviewComponent},
    {path:'newSalesDay',component:CreateSalesDayComponent},
    {path:'salesDay',component:SalesDayComponent},
    {path:'Home',component:AppComponent},
    {path:'**',component:WelcomePageComponent},
];
