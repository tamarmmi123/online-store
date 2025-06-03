import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../classes/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private URL = 'https://localhost:7025/api';

  constructor(private httpClient: HttpClient) { }

  getAllCategories() {
    return this.httpClient.get<Category[]>(`${this.URL}/categories`);
  }

  getCategoryByName(name: string): Observable<Category> {
    return this.httpClient.get<Category>(`${this.URL}/categories/by-name/${name}`);
  }

}
