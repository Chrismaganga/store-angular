// src/app/components/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  totalPrice: number = 0;
  error: string = '';
  loading: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.cartItems$ = this.cartService.getCartItems();
  }

  ngOnInit(): void {
    this.loading = true;
    this.cartItems$.subscribe({
      next: (items) => {
        this.calculateTotal();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading cart items';
        this.loading = false;
      }
    });
  }

  removeItem(productId: number): void {
    try {
      this.cartService.removeFromCart(productId);
      this.calculateTotal();
    } catch (err) {
      this.error = 'Error removing item from cart';
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity < 1) {
      this.error = 'Quantity must be at least 1';
      return;
    }
    try {
      this.cartService.updateCartItemQuantity(productId, quantity);
      this.calculateTotal();
    } catch (err) {
      this.error = 'Error updating quantity';
    }
  }

  clearCart(): void {
    try {
      this.cartService.clearCart();
      this.totalPrice = 0;
    } catch (err) {
      this.error = 'Error clearing cart';
    }
  }

  calculateTotal(): void {
    this.cartItems$.subscribe(items => {
      this.totalPrice = items.reduce((total, item) => 
        total + (item.product.price * item.quantity), 0);
    });
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}