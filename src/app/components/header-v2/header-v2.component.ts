import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';


@Component({
  selector: 'app-header-v2',
  templateUrl: './header-v2.component.html',
  styleUrls: ['./header-v2.component.css'],
  standalone: true,
  imports: [] // Add any additional imports needed for this component
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;  // Controls menu toggle
  cartCount = 0;      // To store the number of items in the cart

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to getCartItems to retrieve the array and update cartCount
    this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      this.cartCount = items.length; // Update cart count based on cart items
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; // Toggle menu state
  }
}
