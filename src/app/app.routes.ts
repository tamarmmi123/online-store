import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ItemsComponent } from './components/items/items.component';
import { UserComponent } from './components/user/user.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { OrdersByIdComponent } from './components/orders-by-id/orders-by-id.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


export const routes: Routes = [
     { path: '', component: HomeComponent },
     { path: 'shopping-cart', component: ShoppingCartComponent },
     { path: 'users/:id', component: UserComponent },
     { path: 'login', component: LoginComponent },
     { path: 'register', component: RegisterComponent },
     { path: 'home', component: HomeComponent },
     { path: 'products', component: ItemsComponent },
     { path: 'product/:id', component: ProductPageComponent },
     { path: 'checkout', component: CheckoutComponent },
     { path: 'orders/by-userId/:id', component: OrdersByIdComponent },
     {
          path: 'categories',
          loadComponent: () => import('./components/categories/categories.component').then(m => m.CategoriesComponent),
          canActivate: [AuthGuard]
     },
     { path: '**', component: NotFoundComponent }
];