import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems$: Observable<CartItem[]>;
  totalPrice: number = 0;
  error: string = '';
  loading: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.cartItems$ = this.cartService.getCartItems();
  }

  ngOnInit(): void {
    this.loading = true;
    this.subscriptions.add(
      this.cartItems$.subscribe({
        next: (items) => {
          this.calculateTotal();
          this.loading = false;
        },
        error: (err: Error) => {
          this.error = 'Error loading cart items';
          this.loading = false;
          console.error('Cart loading error:', err);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  removeItem(productId: number): void {
    try {
      this.cartService.removeFromCart(productId);
      this.calculateTotal();
    } catch (err) {
      this.error = 'Error removing item from cart';
      console.error('Remove item error:', err);
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity < 1) {
      this.error = 'Quantity must be at least 1';
      return;
    }
    if (quantity > 99) {
      this.error = 'Maximum quantity is 99';
      return;
    }
    try {
      this.cartService.updateCartItemQuantity(productId, quantity);
      this.calculateTotal();
    } catch (err) {
      this.error = 'Error updating quantity';
      console.error('Update quantity error:', err);
    }
  }

  clearCart(): void {
    try {
      this.cartService.clearCart();
      this.totalPrice = 0;
    } catch (err) {
      this.error = 'Error clearing cart';
      console.error('Clear cart error:', err);
    }
  }

  calculateTotal(): void {
    this.subscriptions.add(
      this.cartItems$.subscribe(items => {
        this.totalPrice = items.reduce((total, item) => 
          total + (item.product.price * item.quantity), 0);
      })
    );
  }

  proceedToCheckout(): void {
    if (this.totalPrice > 0) {
      this.router.navigate(['/checkout']);
    } else {
      this.error = 'Your cart is empty';
    }
  }

  continueShopping(): void {
    this.router.navigate(['/product-list']);
  }

  formatPrice(price: number): string {
    return price.toFixed(2);
  }
}