import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-list/:category', component: ProductListComponent },
  { path: 'product-list/:category/:id', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
