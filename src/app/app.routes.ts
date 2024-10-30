import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';

export const routes: Routes = [
  { 
    path: 'product-detail', 
    component: ProductDetailComponent,
    children: [
      { path: ':id', component: ProductDetailComponent }
    ]
  },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent },
  { 
    path: 'product-list', component: ProductListComponent 
  },
  { 
    path: '', redirectTo: 'product-list', pathMatch: 'full' 
  },
  { 
    path: '**', component: PageNotFoundComponent 
  }
];
