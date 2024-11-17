import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ProductListComponent } from './product-list.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    children: [
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent }
    ]
  }
];