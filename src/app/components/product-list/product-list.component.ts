import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../shared/models/Product';
import { ProductService } from '../../services/product.service';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class ProductListComponent implements OnInit {
showMessage() {
throw new Error('Method not implemented.');
}

  products: Product[] = [];
  message: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addToCart(product: Product): void {
    const cartItem: CartItem = {
      product: product,
      quantity: 1
    };
    
    this.cartService.addToCart(cartItem);
    alert(`${product.title} has been added to the cart!`);
    
    // Remove the product from the display list
    this.products = this.products.filter(p => p._id !== product.id);
    
    // Log the product ID
    console.log(`Product ID ${product._id} added to cart`);
  }

  onError(event: ErrorEvent): void {
    console.error('Image load error', event);
  }

  viewCart(): void {
    window.location.href = '/cart';
  }
}