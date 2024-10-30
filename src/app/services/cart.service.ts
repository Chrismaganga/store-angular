// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../shared/models/Product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>(this.cartItems);

  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: Product) {
    this.cartItems.push(product);
    this.cartItemsSubject.next(this.cartItems);
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.cartItemsSubject.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }

  getTotalAmount() {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
}
