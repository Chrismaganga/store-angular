import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/Product';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  value: any;
  next(items: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://jsonserver.reactbd.com/phone';

  constructor(private http: HttpClient) {}

  // Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Fetch a single product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);

  }
  // getAllProductsByCateogry(id: number): Observable<any[]> {
  //   return this.http.get<any[]>("https://jsonserver.reactbd.com/phone"+ id);
  // }

}
