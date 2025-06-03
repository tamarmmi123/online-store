import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems: { product: Product, quantity: number }[] = [];
  private cartItemsSubject = new BehaviorSubject<{ product: Product, quantity: number }[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this._cartItems = JSON.parse(savedCart);
      this.cartItemsSubject.next(this._cartItems);
      this.updateCartCount();
    }
  }

  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this._cartItems));
  }

  hasItems(): boolean {
    return this._cartItems.length > 0;
  }

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  getCartItems() {
    return this._cartItems;
  }

  addToCart(product: Product, quantity: number = 1): void {
    const existing = this._cartItems.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this._cartItems.push({ product, quantity });
    }
    this.cartItemsSubject.next(this._cartItems);
    this.updateCartCount();
    this.saveCartToStorage();
  }

  clearCart(): void {
    this._cartItems = [];
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cart');
    this.updateCartCount();
  }

  private updateCartCount(): void {
    const count = this._cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCount.next(count);
  }

  getTotalQuantity(): number {
    return this._cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  decreaseItem(product: Product): void {
    const existing = this._cartItems.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity--;
      if (existing.quantity <= 0) {
        this._cartItems = this._cartItems.filter(item => item.product.id !== product.id);
      }
      this.cartItemsSubject.next(this._cartItems);
      this.updateCartCount();
      this.saveCartToStorage();
    }
  }

  removeItem(product: Product): void {
    this._cartItems = this._cartItems.filter(item => item.product.id !== product.id);
    this.cartItemsSubject.next(this._cartItems);
    this.updateCartCount();
    this.saveCartToStorage();
  }
}
