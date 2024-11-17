import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/Product';

export interface CartItem {
    product: Product; // Change from Product[] to Product
    quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  updateQuantity(productId: number, quantity: number) {
    throw new Error('Method not implemented.');
  }
  getProductById(productId: number) {
    throw new Error('Method not implemented.');
  }
  updateCart(filteredItems: CartItem[]) {
    throw new Error('Method not implemented.');
  }
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  // Get the current items from the BehaviorSubject
  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$;
  }

  // Add an item to the cart
  addToCart(item: CartItem): void {
    const items = this.cartItemsSubject.value;
    items.push(item);
    this.cartItemsSubject.next([...items]); // Spread to trigger a new state in BehaviorSubject
  }

  // Update the quantity of a cart item
  updateCartItemQuantity(productId: number, quantity: number): void {
    const items = this.cartItemsSubject.value.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: quantity > 0 ? quantity : 1 };
      }
      return item;
    });

    this.cartItemsSubject.next(items);
  }

  // Remove a product from the cart
  removeFromCart(productId: number): void {
    const items = this.cartItemsSubject.value.filter(item => item.product.id !== productId);
    this.cartItemsSubject.next(items);
  }

  // Clear the cart entirely
  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  // Calculate the total price of items in the cart
  getTotalPrice(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
