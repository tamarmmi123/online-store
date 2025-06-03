import { Component } from '@angular/core';
import { Product } from '../../classes/product';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

// import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule, MatButtonModule, /* MatIcon*/],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  cartItems: { product: Product, quantity: number }[] = [];

  constructor(private router: Router, private cartService: CartService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  shop() {
    this.router.navigate(['/products']);
  }

  getTotalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalCost(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity * item.product.cost, 0);
  }

  increaseQty(product: Product): void {
    this.cartService.addToCart(product, 1);
    this.refreshCart();
  }

  decreaseQty(product: Product): void {
    this.cartService.decreaseItem(product);
    this.refreshCart();
  }

  confirmRemoveProduct(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Remove Product',
        message: `Are you sure you want to remove ${product.productName} from your cart?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cartService.removeItem(product);
        this.refreshCart();
      }
    });
  }

  refreshCart(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  checkout(){
    this.router.navigate(['/checkout'])
  }
}
