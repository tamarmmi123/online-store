import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Order } from '../../classes/order';
import { OrderService } from '../../services/order.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-orders-by-id',
  templateUrl: './orders-by-id.component.html',
  styleUrls: ['./orders-by-id.component.scss'],
  imports: [NgIf, NgFor, CommonModule]
})
export class OrdersByIdComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrderService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/login']);
      return;
    }

    this.ordersService.getOrdersByUserId(id).subscribe({
      next: (orders) => (this.orders = orders),
      error: (err) => {
        console.error('Failed to fetch orders', err);
        this.router.navigate(['/login']);
      }
    });
  }
}
