import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private URL = 'https://localhost:7025/api';

  constructor(private httpClient: HttpClient) { }

  getItems() {
    return this.httpClient.get<Product[]>(`${this.URL}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.URL}/products/${id}`);
  }
}
