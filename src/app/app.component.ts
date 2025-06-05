import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { CartSidebarComponent } from "./components/cart-sidebar/cart-sidebar.component";
import { CartService } from './services/cart.service';
import { filter } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, CartSidebarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angularProject';
  showSidebar = false;

  constructor(public cartService: CartService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.updateSidebarVisibility());

    this.cartService.cartItems$.subscribe(() => this.updateSidebarVisibility());
  }

  private updateSidebarVisibility() {
    const hasItems = this.cartService.getCartItems().length > 0;
    const isCartPage = this.router.url === '/shopping-cart';
    this.showSidebar = hasItems && !isCartPage;
  }
}
