import { CartItem, CartService } from '../../services/cart.service';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-v2',
  templateUrl: './header-v2.component.html',
  styleUrls: ['./header-v2.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isCartOpen = false;
  cartCount = 0;
  cartItems: CartItem[] = [];
  private cartSubscription: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.cartCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isCartOpen = false;
    }
  }

  toggleCart(event: Event): void {
    event.stopPropagation();
    this.isCartOpen = !this.isCartOpen;
    if (this.isCartOpen) {
      this.isMenuOpen = false;
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  closeCart(): void {
    this.isCartOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartIcon = document.querySelector('.cart-link');
    if (cartDropdown && cartIcon) {
      if (!cartDropdown.contains(event.target as Node) && 
          !cartIcon.contains(event.target as Node)) {
        this.closeCart();
      }
    }
  }

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      this.cartService.updateCartItemQuantity(item.product.id, newQuantity);
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.product.id);
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0);
  }

  proceedToCheckout(): void {
    this.closeCart();
    this.router.navigate(['/checkout']);
  }
}
