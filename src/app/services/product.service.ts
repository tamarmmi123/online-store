import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../classes/product';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URL = "https://localhost:7025/api/products"
  constructor(private httpClient: HttpClient, private userService: UserService) { }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.URL}/${id}`);
  }

  deleteProduct(id: number): Observable<void> {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.delete<void>(`${this.URL}/${id}`, { headers }); // ✅ fix here
  }

  updateProduct(updateProduct: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.URL}/${updateProduct.id}`, updateProduct);
  }

  addProduct(product: Product): Observable<Product> {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<Product>(this.URL, product, { headers });
  }

}
