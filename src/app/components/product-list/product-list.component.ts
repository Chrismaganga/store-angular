import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../shared/models/Product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

interface CartItem {
  product: Product;
  quantity: number;
}

interface ProductWithQuantity extends Product {
  quantity: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: ProductWithQuantity[] = [];
  loading = true;
  error = '';
  private subscriptions = new Subscription();

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscriptions.add(
      this.productService.getProducts().subscribe({
        next: (data) => {
          // Initialize each product with its own quantity
          this.products = data.map(product => ({
            ...product,
            quantity: 1
          }));
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error loading products. Please try again later.';
          this.loading = false;
          console.error('Error loading products:', error);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  incrementQuantity(product: ProductWithQuantity, event: Event): void {
    event.stopPropagation();
    if (product.quantity < 10) {
      product.quantity++;
      // Create a new array reference to trigger change detection
      this.products = [...this.products];
    }
  }

  decrementQuantity(product: ProductWithQuantity, event: Event): void {
    event.stopPropagation();
    if (product.quantity > 1) {
      product.quantity--;
      // Create a new array reference to trigger change detection
      this.products = [...this.products];
    }
  }

  addToCart(product: ProductWithQuantity, event: Event): void {
    event.stopPropagation();
    const cartItem: CartItem = {
      product: product,
      quantity: product.quantity
    };
    
    this.cartService.addToCart(cartItem);
    this.showNotification(`${product.title} (${product.quantity}) added to cart!`);
    // Reset quantity after adding to cart
    product.quantity = 1;
    // Create a new array reference to trigger change detection
    this.products = [...this.products];
  }

  removeFromCart(product: ProductWithQuantity, event: Event): void {
    event.stopPropagation();
    this.cartService.removeFromCart(product.id);
    this.showNotification('Item removed from cart');
    // Reset quantity after removing from cart
    product.quantity = 1;
    // Create a new array reference to trigger change detection
    this.products = [...this.products];
  }

  showNotification(message: string): void {
    // You can replace this with a proper notification system
    alert(message);
  }

  viewProductDetails(product: Product, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/product', product.id]);
  }

  onError(event: ErrorEvent): void {
    console.error('Image load error', event);
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/placeholder.png'; // Add a placeholder image
  }

  getDiscountPercentage(product: Product): number {
    if (product.previousPrice) {
      return Math.round(((product.previousPrice - product.price) / product.previousPrice) * 100);
    }
    return 0;
  }
}