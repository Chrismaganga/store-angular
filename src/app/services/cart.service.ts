import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../shared/models/Product';

export interface CartItem {
    product: Product;
    quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$;
  }

  addToCart(item: CartItem): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItemIndex = currentItems.findIndex(i => i.product.id === item.product.id);

    if (existingItemIndex > -1) {
      currentItems[existingItemIndex].quantity += item.quantity;
      this.cartItemsSubject.next([...currentItems]);
    } else {
      this.cartItemsSubject.next([...currentItems, item]);
    }
  }

  updateCartItemQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: Math.max(1, quantity) };
      }
      return item;
    });
    this.cartItemsSubject.next(updatedItems);
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItemsSubject.next(updatedItems);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  getTotalPrice(): number {
    return this.cartItemsSubject.value.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0);
  }
}
