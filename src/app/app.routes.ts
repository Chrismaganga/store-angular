import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { 
    path: 'product-detail', 
    component: ProductDetailComponent,
    children: [
      { path: ':id', component: ProductDetailComponent }
    ]
  },
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
