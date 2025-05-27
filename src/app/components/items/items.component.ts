import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from '../item/item.component';
import { ItemsService } from '../../services/items.service';
import { Product } from '../../classes/product';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {
  items: Product[] = [];

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.itemsService.getItems().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (err) => {
        console.error('Error fetching items', err);
      }
    });
  }

  trackById(index: number, item: Product) {    
    return item.id;
  }

}
