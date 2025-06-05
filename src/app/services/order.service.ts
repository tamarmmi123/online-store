import { Injectable } from '@angular/core';
import { Order } from '../classes/order';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private URL = 'https://localhost:7025/api';

  constructor(private httpClient: HttpClient) { }

  getOrdersByUserId(userId: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.URL}/orders/by-userId/${userId}`);
  }

  createOrder(order: any): Observable<Order> {
    return this.httpClient.post<Order>(`${this.URL}/orders`, order);
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.URL}/orders/${orderId}`);
  }
}
