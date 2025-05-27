import { Component, Input } from '@angular/core';
import { Product } from '../../classes/product';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-item',
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  @Input() product!: Product;
constructor(public userService: UserService, private router: Router, private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.product, this.quantity);
  }

ngOnInit() {
  console.log('Product:', this.product);
}

  navigateToProduct(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (target.closest('button')) {
    return; // Don't navigate if a button was clicked
  }
  this.router.navigate(['/product', this.product.id]);
}

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  getUserRole(): string | null {
    const currentUser = this.userService.getCurrentUser();
    return currentUser?.role ?? null;
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
}
