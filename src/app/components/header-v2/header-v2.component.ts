import { CartItem, CartService } from '../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-v2',
  templateUrl: './header-v2.component.html',
  styleUrls: ['./header-v2.component.css'],
  standalone: true,
  imports: [] 
})
export class HeaderComponent implements OnInit {
  theme = 'light';
  isMenuOpen = false;  
  cartCount = 0;     

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to getCartItems to retrieve the array and update cartCount
    this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      this.cartCount = items.length; 
      
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    

  }
}
