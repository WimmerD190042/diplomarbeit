export * from './category.service';
import { CategoryService } from './category.service';
export * from './customer.service';
import { CustomerService } from './customer.service';
export * from './order.service';
import { OrderService } from './order.service';
export * from './salesDay.service';
import { SalesDayService } from './salesDay.service';
export const APIS = [CategoryService, CustomerService, OrderService, SalesDayService];
