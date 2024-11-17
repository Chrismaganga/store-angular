import { Component, NO_ERRORS_SCHEMA, OnInit, TemplateRef } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIfContext } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule], // CommonModule must be imported
  schemas: [NO_ERRORS_SCHEMA]
})
export class CartComponent implements OnInit {
incrementQuantity(arg0: number) {
throw new Error('Method not implemented.');
}

deleteItem(productId: number) {
  const cartProducts = this.localStorageService.get('cart-products');
  const updatedCartProducts = cartProducts.filter((product: Product) => product.id !== productId);
  this.localStorageService.set('cart-products', updatedCartProducts);
  this.cartService.removeFromCart(productId);
}

emptyCart: TemplateRef<NgIfContext<{ product: Product; quantity: number; }[]|null>>|null = null
  totalPrice: number = 0;
  loading: boolean = false;
  error: string | null = null;
  cartItems$: Observable<{ product: Product, quantity: number }[]>;
  product: Product | undefined;
  localStorageService: any = {
    set: (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value)),
    get: (key: string) => JSON.parse(localStorage.getItem(key) || '[]') || []
  };

  constructor(private cartService: CartService, private router: Router) {
    this.cartItems$ = this.cartService.cartItems$;
  }

  ngOnInit(): void {
    this.cartItems$.subscribe((items: any[]) => {
      this.totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    });
  }
  removeFromCart(productId: number) {
    const cartProducts = this.localStorageService.get('cart-products');
    const updatedCartProducts = cartProducts.filter((product: Product) => product.id !== productId);
    this.localStorageService.set('cart-products', updatedCartProducts);
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.localStorageService.set('cart-products', []);
    this.cartService.clearCart();
  }

  addToCart(product: Product) {
    const cartProducts = this.localStorageService.get('cart-products');
    const existingProduct = cartProducts.find((p: Product) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartProducts.push({ ...product, quantity: 1 });
    }
    this.localStorageService.set('cart-products', cartProducts);
    this.cartService.addToCart({ product, quantity: 1 });
  }

  updateQuantity(productId: number, quantity: number) {
    const cartProducts = this.localStorageService.get('cart-products');
    const productToUpdate = cartProducts.find((product: Product) => product.id === productId);
    if (productToUpdate) {
      productToUpdate.quantity = quantity;
      this.localStorageService.set('cart-products', cartProducts);
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  viewCart() {
    const cartProducts = this.localStorageService.get('cart-products');
    console.log('Cart Items:', cartProducts);
  }
  navigateToCheckout() {
    if (this.router) {
      this.router.navigate(['/checkout']);
    } else {
      console.error('Router is not defined');
    }
  }
}

