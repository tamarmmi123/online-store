import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../classes/order';
import { OrderService } from '../../services/order.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { Product } from '../../classes/product';
import { productOrder } from '../../classes/productOrder';

@Component({
  selector: 'app-orders-by-id',
  templateUrl: './orders-by-id.component.html',
  styleUrls: ['./orders-by-id.component.scss'],
  imports: [NgIf, NgFor, CommonModule, MatCardModule, MatButtonModule]
})
export class OrdersByIdComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrderService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/login']);
      return;
    }

    this.ordersService.getOrdersByUserId(id).subscribe({
      next: (orders) => {
        this.orders = orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
      },
      error: (err) => {
        this.router.navigate(['/login']);
      }
    });
  }

  addToCart(product: productOrder): void {
    const productToAdd = new Product(
      product.productId,
      product.productName,
      0,
      '',
      product.cost,
      0,
      product.imgSource
    );

    this.cartService.addToCart(productToAdd, product.quantity);
  }
}
