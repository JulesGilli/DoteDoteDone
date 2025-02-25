import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = process.env[""];
  private apiUrl = `https://trello.com/1/authorize?expiration=1day&scope=read,write&response_type=token&key=${this.apiKey}`;
  private token: string | null = null;
  constructor(private http: HttpClient, private router: Router) {}
  login(username: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('access_token', token);
  }
  getToken(): string | null {
    return this.token || localStorage.getItem('access_token');
  }
  logout(): void {
    this.token = null;
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}