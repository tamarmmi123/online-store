import { Component, Input } from '@angular/core';
import { Product } from '../../classes/product';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-item',
  imports: [CommonModule, MatButtonModule, MatIcon],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  @Input() product!: Product;
  @Output() productDeleted = new EventEmitter<number>();

  constructor(private categoryService: CategoryService, public userService: UserService, private productService: ProductService, private router: Router, private cartService: CartService, private dialog: MatDialog) { }

  addToCart() {
    if (!this.userService.isLoggedIn())
      this.router.navigate(['login'])
    else
      this.cartService.addToCart(this.product, this.quantity);
  }

  navigateToProduct(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    this.router.navigate(['/product', this.product.id]);
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  getUserRole(): string | null {
    return this.userService.getUserRole();
  }

  isOutOfStock(): boolean {
    return this.product.qtyInStock === 0;
  }

  shouldDisplayProduct(): boolean {
    return this.product.qtyInStock > 0 || this.userService.isManager();
  }

  getToken() {
    return this.userService.getToken();
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


  //----------manager---------
  editProduct(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      const dialogRef = this.dialog.open(UpdateProductComponent, {
        data: {
          product: this.product,
          categories: categories
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Product was updated via popup!');
          this.productService.getProductById(this.product.id).subscribe(updatedProduct => {
            this.product = updatedProduct;
          });
        }
      });
    });
  }

  deleteProduct(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete "${this.product.productName}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () => {
            console.log(`Product with ID ${this.product.id} deleted successfully`);
            this.productDeleted.emit(this.product.id);
          },
          error: (err) => {
            console.error('Error deleting product:', err);
            this.dialog.open(ConfirmDialogComponent, {
              data: {
                title: 'Delete Failed',
                message: 'An error occurred while deleting the product. Please try again.'
              }
            });
          }
        });
      }
    });
  }
}
