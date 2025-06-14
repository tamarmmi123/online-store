import { Component, EventEmitter, output, Output } from '@angular/core';
import { Product } from '../../classes/product';
import { Category } from '../../classes/category';
import { ItemsService } from '../../services/items.service';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-filter',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, NgFor],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  selectedCategoryId: number = 0;
  selectedCategory: string | null = null;
  @Output() categorySelected = new EventEmitter<string>();

  @Output() filtersChanged = new EventEmitter<{
    minPrice: number | null;
    maxPrice: number | null;
  }>();
  minPrice: number | null = null;
  maxPrice: number | null = null;

  @Output() sortOrderChanged = new EventEmitter<'asc' | 'desc'>();
  sortOrder: 'asc' | 'desc' | null = null;

  @Output() searchChanged = new EventEmitter<string>();

  searchQuery: string = '';

  constructor(
    private productService: ItemsService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.productService.getItems().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });

    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSelectChange(name: string) {
    this.selectedCategory = name;
    this.categorySelected.emit(name);
  }

  filterProducts(): void {
    if (this.selectedCategoryId === 0) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        p => p.categoryId === this.selectedCategoryId
      );
    }
  }

  emitFilters(): void {
    this.filtersChanged.emit({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });
  }

  onSortOrderChange(): void {
    if (this.sortOrder) {
      this.sortOrderChanged.emit(this.sortOrder);
    }
  }

  onSearchChange(): void {
    this.searchChanged.emit(this.searchQuery);
  }
}
