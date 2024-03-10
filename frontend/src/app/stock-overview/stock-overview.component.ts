import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import {
  CategoryDto,
  CategoryService,
  MeatPiece,
  MeatPiecePart,
  SubCategory,
  SubCategoryDto,
} from '../swagger';
import { SingleCategoryInfoComponent } from './single-category-info/single-category-info.component';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, SingleCategoryInfoComponent],
  templateUrl: './stock-overview.component.html',
  styleUrl: './stock-overview.component.scss',
})
export class StockOverviewComponent implements OnInit {
  public dataService = inject(DataService);
  public categoryService = inject(CategoryService);
  public router = inject(Router);
  categories: CategoryDto[] = [];
  stockByCategory: { [key: number]: number } = {};
  subCategories = signal<SubCategory[]>([]);
  meatPieces = signal<MeatPiece[]>([]);
  meatPieceParts = signal<MeatPiecePart[]>([]);
  selectedSubCategory: SubCategory | null = null;
  public stockInput: number = 0;
  public priceInput: number = 0;
  subCategoryStock : any = {};

  selectedMeatPiece = signal<MeatPiece>({});
  selectedCategory: CategoryDto | null = null;
  notes: string = '';

  getSubCategoryStock(subCategoryId: number): Observable<number> {
    return this.categoryService.apiCategorySubCategoryTotalStockGet(subCategoryId);
  }

  ngOnInit(): void {
    console.log('StockOverviewComponent.ngOnInit');
    this.categories = this.dataService.categories();

    this.loadStockForCategories();
    console.log('loading!');
  }

  loadStockForCategories(): void {
    this.categories.forEach((category) => {
      this.categoryService.apiCategoryStockByCategoryIdGet(category.id).subscribe(
        (stock) => {
          this.stockByCategory[category.id!] = stock;
        },
        (error) => {
          console.error('Fehler beim Laden des Bestands für Kategorie ' + category.id + ':', error);
        }
      );
    });
  }

  loadStockForSubCategories(): void {
    this.categories.forEach((category) => {
      this.categoryService.apiCategorySubCategoriesByCategoryIdGet(category.id).subscribe((subCategories) => {
        subCategories.forEach((subCategory) => {
          this.getSubCategoryStock(subCategory.id!).subscribe((stock) => {
            this.subCategoryStock[subCategory.id!] = stock;
          });
        });
      });
    });
  }


  getSubcategoriesForCategory(categoryId: number): void {
    this.categoryService
      .apiCategorySubCategoriesByCategoryIdGet(categoryId)
      .subscribe((subCategories) => {
        this.subCategories.set(subCategories);
        console.log('subCategories: ', subCategories);
      });
  }

  setPrice(event: Event, meatPiece: MeatPiece): void {
    event.stopPropagation(); //sonst klappt es zu
    this.selectedMeatPiece.set(meatPiece);
    console.log('meatPieceSet: ', this.selectedMeatPiece());
  }
  updatePrice() {
    this.categoryService
      .apiCategorySetMeatPiecePricePerKgPut(
        this.selectedMeatPiece().id,
        this.priceInput
      )
      .subscribe(() => {
        console.log('Price updated');
        // Lade die Unterkategorien neu, um die aktualisierten Daten anzuzeigen
        this.getSubcategoriesForCategory(this.selectedSubCategory!.categoryId!);
        // Lade die Fleischstücke neu, um die aktualisierten Daten anzuzeigen
        this.getMeatPieces(this.selectedSubCategory!.id!);
        // this.getStockForCategory(this.selectedCategory?.id!);
        this.loadStockForCategories();
      });
  }

  createMeatPiecePart() {
    const meatPiecePart = {
      meatPieceId: this.selectedMeatPiece().id,
      weight: this.stockInput,
      notes: this.notes,
    } as MeatPiecePart;
    this.categoryService
      .apiCategoryAddMeatPiecePartPost(meatPiecePart)
      .subscribe(() => {
        console.log('MeatPiecePart added');
      });
  }

  meatPieceClicked(event: Event,meatPiece: MeatPiece) {
    event.stopPropagation(); //sonst klappt es zu

    console.log('meatPieceClicked');
    this.selectedMeatPiece.set(meatPiece);
    this.categoryService.apiCategoryMeatPiecePartsFromMeatPieceGet(meatPiece.id).subscribe((meatPieceParts) => {
      this.meatPieceParts.set(meatPieceParts);
    });

    this.categoryService
      .apiCategoryMeatPiecePartsFromMeatPieceGet(this.selectedMeatPiece().id)
      .subscribe((meatPieceParts) => {
        console.log('selectedMeatPieceId: ', this.selectedMeatPiece().id);
        this.meatPieceParts.set(meatPieceParts);
        console.log('meatPieceParts: ', meatPieceParts);
      });
  }

  getMeatPieces(subCategoryId: number): void {
    this.categoryService
      .apiCategoryMeatPiecesBySubCategoryIdGet(subCategoryId)
      .subscribe((meatPieces) => {
        this.meatPieces.set(meatPieces);
        console.log('meatPieces: ', meatPieces);
      });
  }

  increaseStockForMeatPiece(event: Event, meatPiece: MeatPiece): void {
    event.stopPropagation(); //sonst klappt es zu
    this.selectedMeatPiece.set(meatPiece);
    console.log('meatPieceSet: ', this.selectedMeatPiece());
  }

  toggleCategory(category: CategoryDto): void {
    if (this.selectedCategory === category) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = category;
    }
    this.getSubcategoriesForCategory(category.id!);
  }
  toggleSubCategory(subCategory: SubCategoryDto) {
    console.log('toooooggle');
    if (this.selectedSubCategory === subCategory) {
      this.selectedCategory = null;
    } else {
      this.selectedSubCategory = subCategory;
    }
    this.getMeatPieces(subCategory.id!);
  }
}

//subkategorie: id3 zb -> SubCategoriesByCategoryId
