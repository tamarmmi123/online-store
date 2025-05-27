import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { Product } from '../../classes/product';
import { CommonModule, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-page',
  imports: [NgIf, CommonModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product!: Product;

  constructor(public userService: UserService, private route: ActivatedRoute, private itemService: ItemsService, private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.product, this.quantity);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getProductById(id).subscribe(product => {
      this.product = product;
    });
  }

  quantity = 1;

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}
