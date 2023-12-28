export * from './customer.service';
import { CustomerService } from './customer.service';
export * from './order.service';
import { OrderService } from './order.service';
export * from './salesDay.service';
import { SalesDayService } from './salesDay.service';
export const APIS = [CustomerService, OrderService, SalesDayService];
