import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../classes/category';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private URL = 'https://localhost:7025/api/categories';
  categoryAdded$ = new Subject<Category>();


  constructor(private httpClient: HttpClient) { }

  getAllCategories() {
    return this.httpClient.get<Category[]>(`${this.URL}`);
  }

  getCategoryByName(name: string): Observable<Category> {
    return this.httpClient.get<Category>(`${this.URL}/by-name/${name}`);
  }

  update(category: Category): Observable<Category> {
    console.log('Token:', localStorage.getItem('token'));

    return this.httpClient.put<Category>(`${this.URL}/${category.id}`, category);
  }

  create(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.URL, category).pipe(
      tap(added => this.categoryAdded$.next(added))
    );
  }
}
