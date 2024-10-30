// src/app/components/cart/cart.component.ts
import { Component, OnInit, TemplateRef } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIfContext } from '@angular/common';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CartComponent implements OnInit {
  totalPrice!: number;
  emptyCart!: TemplateRef<NgIfContext<any>> | null;
loading: any;
error: any;
removeItem(arg0: any) {
throw new Error('Method not implemented.');
}
updateQuantity(arg0: any,arg1: any) {
throw new Error('Method not implemented.');
}
  cartItems$: any;
  totalAmount: number = 0;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cartItems$;
  }

  ngOnInit(): void {
    this.cartItems$.subscribe((items: any[]) => {
      this.totalAmount = items.reduce((total, item) => total + item.price, 0);
    });
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}