import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from '../item/item.component';
import { ItemsService } from '../../services/items.service';
import { Product } from '../../classes/product';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, ItemComponent, SearchFilterComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {
  allItems: Product[] = [];
  items: Product[] = []; selectedCategoryName: string = '';
  filteredProducts: Product[] = [];
  categories: string[] = [];

  constructor(private itemsService: ItemsService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.itemsService.getItems().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (err) => {
        console.error('Error fetching items', err);
      }
    });

    this.itemsService.getItems().subscribe(products => {
      this.allItems = products;
      this.items = products;
    });

    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories.map(c => c.name);
    });
  }

  trackById(index: number, item: Product) {
    return item.id;
  }

  onCategorySelected(categoryName: string): void {
    if (!categoryName) {
      this.filteredProducts = this.items;
      return;
    }

    this.categoryService.getCategoryByName(categoryName).subscribe(category => {
      this.filteredProducts = this.items.filter(p => p.categoryId === category.id);
    });
  }

  filterByCategory(categoryName: string): void {
    if (!categoryName) {
      this.items = this.allItems; // Show all if no filter
      return;
    }

    this.categoryService.getCategoryByName(categoryName).subscribe(category => {
      this.items = this.allItems.filter(p => p.categoryId === category.id);
    });
  }
}
