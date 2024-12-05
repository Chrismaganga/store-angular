import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/Product';
import { ProductService } from '../../services/product.service';
import { ProductListComponent } from "../product-list/product-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterModule, CommonModule, ProductListComponent],

})
export class HomeComponent {
  changeTitle() {
    throw new Error('Method not implemented.');
  }

  title: string = 'Angular Store';
  message: string = 'Discover our amazing collection of products with great deals and exclusive offers';
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
