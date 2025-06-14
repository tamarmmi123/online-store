import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../services/cart.service';
import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';
import { Category } from '../../classes/category';
import { CategoryService } from '../../services/category.service';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatTabsModule, MatMenuModule, MatButtonModule, MatIconModule, MatBadgeModule, NgIf, AsyncPipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  cartCount = 0;
  currentUser$;
  private closeTimeout: any;

  @ViewChild('userMenuTrigger') userMenuTrigger!: MatMenuTrigger;

  constructor(public router: Router, public user: UserService, private categoryService: CategoryService, private dialog: MatDialog, private cartService: CartService) {
    this.currentUser$ = this.user.currentUser$;
  }

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  onTabChange(index: number) {
    const user = this.user.getCurrentUser();

    const routes = [
      '/home',
      '/products',
      user ? `/users/${user.id}` : '/login',
      user ? `/orders/by-userId/${user.id}` : '/login',
      '/shopping-cart'
    ];
    if (index < routes.length) {
      this.router.navigate([routes[index]]);
    }
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  navigateToEdit(id: number) {
    this.router.navigate(['/users', id]);
  }

  openUserMenu() {
    this.userMenuTrigger.openMenu();
  }

  closeUserMenuWithDelay() {
    this.closeTimeout = setTimeout(() => {
      this.userMenuTrigger.closeMenu();
    }, 10000);
  }

  closeUserMenu() {
    this.userMenuTrigger.closeMenu();
  }

  cancelUserMenuClose() {
    clearTimeout(this.closeTimeout);
  }

  confirmLogout(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Logout',
        message: 'Are you sure you want to log out?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '400px',
      data: { id: 0, name: '', Products: [] }
    });

    dialogRef.afterClosed().subscribe((newCategory: Category | undefined) => {
      console.log('Dialog result:', newCategory);
      if (newCategory) {
        this.categoryService.create(newCategory).subscribe(() => {
          console.log('Category created successfully');
        });
      }
    });
  }

  openAddProductDialog() {
    this.dialog.open(AddProductComponent, {
      width: '400px',
    });
  }
}