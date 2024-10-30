import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../shared/models/Product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

interface CartItem {
  product: Product; // Update this line
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

//   cartItemsSubject: any;
// removeToCart(_t6: Product) {
// }
  products: Product[] = [];

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
      quantity: 1 // Set the initial quantity
    };
    
    this.cartService.addToCart(cartItem); // Pass the cart item
    alert(`${product.title} has been added to the cart!`);
  }

  onError(event: ErrorEvent): void {
    console.error('Image load error', event);
  }
  // In cart.service.ts
removeFromCart(productId: number): void {
  const items = this.productService.value.filter((item: { product: { id: number; }; }) => item.product.id !== productId);
  this.productService.next(items);
}



}
