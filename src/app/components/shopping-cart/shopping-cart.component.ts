import { Component } from '@angular/core';
import { Product } from '../../classes/product';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shopping-cart',
  imports: [MatButtonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  cartProds : Product[] = [];

  constructor(private router: Router) {  }

  shop(){
    this.router.navigate(['/products']);
  }
}
