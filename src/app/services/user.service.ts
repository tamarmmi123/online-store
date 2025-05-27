import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, BehaviorSubject } from 'rxjs';
import { User } from '../classes/user';
import { LoginResponse } from '../models/login-response.model';
import { jwtDecode } from 'jwt-decode';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private URL = 'https://localhost:7025/api';
  private currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<User> {
    return this.httpClient.post<LoginResponse>(`${this.URL}/users`, user).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.currentUser.next(response.user);
      }),
      map(response => response.user),
      catchError(error => {
        console.error('Error occurred during registration:', error);
        return throwError(() => error);
      })
    );
  }

  login(userName: string, password: string): Observable<User> {
    const body = { userName, password };

    return this.httpClient
      .post<LoginResponse>(`${this.URL}/login`, body)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.currentUser.next(response.user);

          const decodedToken: any = jwtDecode(response.token);
        }),
        map(response => response.user)

      );
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.URL}/users/${id}`);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    const token = this.getToken();
    if (!token) return null;    

    const decoded: any = jwtDecode(token);
    return {
      id: +decoded['id'],
      userName: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      password: '',
      firstName: decoded['firstName'],
      lastName: decoded['lastName'],
      phoneNumber: decoded['phoneNumber'],
      address: decoded['address'],
      email: decoded['email'],
      orders: [],
      role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    };
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.next({...user});
  }

  logout(): void {
    this.currentUser.next(null);
    localStorage.removeItem('token');
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.URL}/users/${user.id}`, user);
  }

  isManager(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'manager';
  }
}