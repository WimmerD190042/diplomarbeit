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
  OrderDto,
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

  meatPieces= signal<MeatPieceDto[]>([]);
  subCategories = signal<SubCategoryDto[]>([]);
  selectedSubCategory = signal<SubCategoryDto>({});
  selectedCategory = new BehaviorSubject<CategoryDto>({});
  categories = signal<CategoryDto[]>([]);
  customers = signal<CustomerDto[]>([]);
  salesDays = signal<SalesDayDto[]>([]);
  selectedSalesDay = new BehaviorSubject<SalesDayDto>({});

  salesDayDateString = signal('');

  setSelectedSubCategory(subCategory: SubCategoryDto) {
    this.selectedSubCategory.set(subCategory);
    console.log('selectedSubCategory: ', this.selectedSubCategory());
  }

  getMeatPieces()  {
      console.log(this.selectedSubCategory().id+'id')
      this.categoryService.apiCategoryMeatPiecesBySubCategoryGet(this.selectedSubCategory().id!).subscribe((meatPieces) => {
        this.meatPieces.set(meatPieces);
        console.log('meatPieces: ', this.meatPieces());
      });
  }

  getSubCategories() {
    this.categoryService
      .apiCategorySubCategoriesByCategoryGet(this.selectedCategory.value.id)
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
    return this.formateDate(salesDay);
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

  formateDate(salesDay: SalesDayDto) {
    if (salesDay && salesDay.dateString) {
      if (!salesDay) {
        return 'Kein Datum ausgewählt';
      }
      console.log('bin hieeer');
      const dateObject = new Date(salesDay.dateString);
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };
      console.log(dateObject.toLocaleDateString('de-DE', options));
      return dateObject.toLocaleDateString('de-DE', options);
    } else {
      // Handle the case when dateString is not available

      return undefined;
    }
  }
}
