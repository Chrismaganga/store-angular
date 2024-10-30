import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/Product';
import { ProductService } from '../../services/product.service';
import { ProductListComponent } from "../product-list/product-list.component";
import { ProductDetailComponent } from "../product-detail/product-detail.component";



@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ProductListComponent, ProductDetailComponent],

})
export class HomeComponent {
changeTitle() {
throw new Error('Method not implemented.');
}

title: string = 'store-angular';
message: string = 'Embrace the massive ecommerce';
addToCart(arg0: Product) {
throw new Error('Method not implemented.');
}
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
      console.log('data', data)
    });
  }
}
