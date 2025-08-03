import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7125/api/auth'; // Update to your API
  private tokenKey = 'jwtToken';

  constructor(private http: HttpClient) {}

  login(model: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, model).pipe(
      tap((res: any) => {
        localStorage.setItem(this.tokenKey, res.token);
      })
    );
  }

  register(model: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, model);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
