import {
  Component,
  Inject,
  Injectable,
  InjectionToken,
  Signal,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  Category,
  CategoryDto,
  CategoryService,
  CustomerDto,
  CustomerService,
  MeatPieceDto,
  MeatPiecePartDto,
  OrderDashboardDto,
  OrderDto,
  OrderService,
  SalesDayDto,
  SalesDayService,
  SubCategoryDto,
} from './swagger';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
export const SWAGGER_salesDayService_TOKEN =
  new InjectionToken<SalesDayService>('swaggersalesDayService');

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private orderService = inject(OrderService);
  private salesDayService = inject(SalesDayService);
  private customerService = inject(CustomerService);
  private categoryService = inject(CategoryService);

  private dateObject: Date | undefined;
  public formattedDate: string | undefined;

  //?
  private _subCategories = new BehaviorSubject<SubCategoryDto[]>([]);
  public subCategories$: Observable<SubCategoryDto[]> =
    this._subCategories.asObservable();

   

  updateSubCategories(subCategories: SubCategoryDto[]) {
    this._subCategories.next(subCategories);
  }
  //?

  selectedCustomer = new BehaviorSubject<CustomerDto>({});
  meatPieces = signal<MeatPieceDto[]>([]);
  subCategories = signal<SubCategoryDto[]>([]);
  selectedSubCategory = signal<SubCategoryDto>({});
  selectedCategory = new BehaviorSubject<CategoryDto>({});
  categories = signal<CategoryDto[]>([]);
  customers = signal<CustomerDto[]>([]);
  salesDays = signal<SalesDayDto[]>([]);
  allMeatPieces = signal<MeatPieceDto[]>([]);
  selectedSalesDay = new BehaviorSubject<SalesDayDto>({});
  allOrders = signal<OrderDto[]>([]);
  salesDayDateString = signal('');
  meatPieceParts = signal<MeatPiecePartDto[]>([]);
  recentOrders = signal<OrderDashboardDto[]>([]);

  setSelectedSubCategory(subCategory: SubCategoryDto) {
    this.selectedSubCategory.set(subCategory);
    console.log('selectedSubCategory: ', this.selectedSubCategory());
  }

  getMeatPiecePartsFromMeatPieceId(meatPieceId: number) {
    this.categoryService
      .apiCategoryMeatPiecePartsFromMeatPieceGet(meatPieceId)
      .subscribe((meatPieceParts) => {
        this.meatPieceParts.set(meatPieceParts);
        console.log('meatPieceParts: ', this.meatPieceParts());
      });
    
  }

  getMeatPieces() {
    console.log(this.selectedSubCategory().id + 'id');
    this.categoryService
      .apiCategoryMeatPiecesBySubCategoryIdGet(this.selectedSubCategory().id!)
      .subscribe((meatPieces) => {
        this.meatPieces.set(meatPieces);
        console.log('meatPieces: ', this.meatPieces());
      });
  }
  getRevenue(): Promise<number> {
    return new Promise((resolve, reject) => {
      let revenue = 0;
      this.orderService.orderOrdersGet().subscribe(
        (orders) => {
          orders.forEach((order) => {
            console.log(order.price);
            revenue += order.price!;
          });
          console.log(revenue + 'revenue');
          resolve(revenue);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getSubCategories() {
    this.categoryService
      .apiCategorySubCategoriesByCategoryIdGet(this.selectedCategory.value.id)
      .subscribe((subCategories) => {
        this.subCategories.set(subCategories);
        this.updateSubCategories(subCategories);
        console.log('subCategories: ', this.subCategories());
      });
  }

  constructor() {
    this.loadSalesDaysFromBackend();
    this.loadCustomersFromBackend();
    this.loadCategoriesFromBackend();
  }

  getSalesDayDate(salesDay: SalesDayDto) {
    return salesDay.dateString;
  }

  getMeatPieceFromID(id: number): MeatPieceDto | undefined {
    return (
      this.categories()
        .flatMap((x) => x?.subCategories)
        .flatMap((x) => x?.meatPieces)
        .find((x) => x?.id == id) || undefined
    );
  }

  loadCategoriesFromBackend() {
    this.categoryService.apiCategoryGetAllCategoriesGet().subscribe((x) => {
      this.categories.set(x);
   
      console.log(this.categories());
    });
  }

  loadCustomersFromBackend() {
    this.customerService.apiCustomerGetAllCustomersGet().subscribe((x) => {
      this.customers.set(x);
    });
  }

  loadSalesDaysFromBackend() {
    this.salesDayService.apiSalesDayGetSalesDaysGet().subscribe((x) => {
      this.salesDays.set(x);
      
    });
  }

  loadMeatPiecedFromBackend() {
    this.categoryService.apiCategoryGetAllMeatPieacesGet().subscribe((x) => {
      this.allMeatPieces.set(x);
    });
  }

  loadOrdersOfSalesDayFromBackend(salesDayId: number) {
    this.orderService.orderOrdersForSalesDayGet(salesDayId).subscribe((x) => {
      this.allOrders.set(x);
    });
  }

  loadDashboardOrdersFromBackend(startDate: string, endDate: string) {
this.orderService.orderDashboardOrdersGet(startDate, endDate).subscribe((x) => {
      this.recentOrders.set(x);
      console.log('recentOrders: ', this.recentOrders());
    });

    // this.orderService.orderOrdersForDashboardGet(startDate, endDate).subscribe((x) => {
    //     this.recentOrders.set(x);
    //     console.log('recentOrders: ', this.recentOrders());
    // });
  }
}