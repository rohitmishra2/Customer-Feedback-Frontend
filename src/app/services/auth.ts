import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { API_BASE_URL } from '../config';

type LoginResponse = {
  token: string;
  role: 'ADMIN' | 'USER';
};

@Injectable({ providedIn: 'root' })
export class AuthService {

  private tokenKey = 'auth_token';
  private roleKey = 'auth_role';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${API_BASE_URL}/auth/signin`, {
        email,
        password
      })
      .pipe(
        tap(res => {
          localStorage.setItem(this.tokenKey, res.token);
          localStorage.setItem(this.roleKey, res.role);
        })
      );
  }

  register(fullName: string, email: string, password: string) {
  return this.http.post(`${API_BASE_URL}/auth/register`, {
    fullName,
    email,
    password
  });
}


  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): 'ADMIN' | 'USER' | null {
    return localStorage.getItem(this.roleKey) as any;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
}
