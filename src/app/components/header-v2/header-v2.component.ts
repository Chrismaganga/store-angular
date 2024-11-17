import { CartItem, CartService } from '../../services/cart.service';
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-v2',
  templateUrl: './header-v2.component.html',
  styleUrls: ['./header-v2.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HeaderV2Component implements OnInit {
  isMenuOpen = false;
  cartCount = 0;


  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      this.cartCount = items.length;
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  constructor(private cartService: CartService, private router: Router) {}

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}

