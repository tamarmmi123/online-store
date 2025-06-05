import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-sidebar',
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.scss'
})
export class CartSidebarComponent implements OnInit{
  cartItems$!: Observable<any[]>; 

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cartItems$;
  }

  constructor(
    public cartService: CartService,
    private router: Router
  ) { }

  isVisible(): boolean {
    return this.cartService.hasItems() && this.router.url !== '/shopping-cart';
  }
}
