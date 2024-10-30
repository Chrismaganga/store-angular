import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../shared/models/Product';
import { CommonModule } from '@angular/common';
// import { NO_ERRORS_SCHEMA } from '@angular/compiler';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,

    imports: [
    CommonModule,
  ],
  // Include NO_ERRORS_SCHEMA here
  // schemas: [NO_ERRORS_SCHEMA]
})

export class ProductListComponent implements OnInit {
addToCart(_t5: any) {
throw new Error('Method not implemented.');
}
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      console.log(data)
    });
  }
}
