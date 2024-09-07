import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Product } from '../models/product.model';
import { ProductInput } from '../models/product-input.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/product`);
  }

  createProduct(product: ProductInput): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/product`, product, {
      headers: {
        'Authorization': this.cookieService.get('Authorization'),
    }});
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${environment.apiUrl}/product/${id}`, {
      headers: {
        'Authorization': this.cookieService.get('Authorization'),
    }});
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/product/${id}`);
  }

  updateProduct(product: ProductInput): Observable<ProductInput> {
    return this.http.put<ProductInput>(`${environment.apiUrl}/product/${product.id}`, product, {
      headers: {
        'Authorization': this.cookieService.get('Authorization'),
    }});
  }
}
