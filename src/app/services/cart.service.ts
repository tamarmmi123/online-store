import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: { product: Product, quantity: number }[] = [];

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor() {}

  addToCart(product: Product, quantity: number): void {
    const existing = this.cartItems.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    this.updateCartCount();
    console.log(`Added ${quantity} of ${product.productName} to cart`);
  }

  private updateCartCount(): void {
    const count = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCount.next(count);
  }

  getCartItems() {
    return this.cartItems;
  }
}
