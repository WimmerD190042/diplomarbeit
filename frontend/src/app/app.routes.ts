import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateSalesDayComponent } from './create-sales-day/create-sales-day.component';
import { SalesDayComponent } from './sales-day/sales-day.component';

export const routes: Routes = [
    {path:'newSalesDay',component:CreateSalesDayComponent},
    {path:'salesDay',component:SalesDayComponent},
    {path:'Home',component:AppComponent},

];
