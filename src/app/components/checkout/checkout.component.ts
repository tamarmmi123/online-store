import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateAddressDialogComponent } from '../update-address-dialog/update-address-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CardNumberFormatPipe } from '../../pipes/card-number-format.pipe';
import { OrderService } from '../../services/order.service';


@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    CardNumberFormatPipe
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  user: any;
  cartItems: any[] = [];
  cardNumber = '';
  expiryMonth: string = '';
  expiryYear: string = '';
  cvv = '';
  currentYear: number = new Date().getFullYear();
  years: number[] = [];

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();

    for (let i = 0; i <= 10; i++) {
      this.years.push(this.currentYear + i);
    }

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      if (this.cartItems.length === 0) {
        this.navigateToProducts();
      }
    });
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }

  get total(): number {
    return this.cartItems.reduce((sum, item) => sum + item.product.cost, 0);
  }

  onCardNumberInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value || '';

    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length > 16) {
      this.cardNumber = numericValue.slice(0, 16);
    } else {
      this.cardNumber = numericValue;
    }
  }

  placeOrder(): void {
    const order = {
      userId: this.user.id,
      totalSum: this.total,
      products: this.cartItems.map(item => ({
        id: item.product.id,
        quantity: item.quantity
      }))
    };

    this.orderService.createOrder(order).subscribe({
      next: (createdOrder: any) => {
        console.log("SUCCESS RESPONSE:", createdOrder);
        this.cartService.clearCart();
        this.router.navigate(['/orders/by-userId', this.user.id]);
      },
      error: (error) => {
        console.error("ERROR RESPONSE:", error);
      }
    });
  }

  isPaymentInfoValid(): boolean {
    return (
      this.cardNumber.length === 16 &&
      this.expiryMonth != null &&
      this.expiryYear != null &&
      this.cvv.length >= 3
    );
  }

  changeAddress(): void {
    const dialogRef = this.dialog.open(UpdateAddressDialogComponent, {
      data: { address: this.user.address }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user.address = result;
      }
    });
  }
}