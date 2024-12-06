import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  cartTotal: number = 0;
  cartItems: CartItem[] = [];
  isDropdownOpen: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.cartService.getCartItems().subscribe(items => {
        this.cartItems = items;
        this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
        this.cartTotal = items.reduce((total, item) => 
          total + (item.product.price * item.quantity), 0);
      })
    );
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  goToCheckout(): void {
    this.closeDropdown();
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}