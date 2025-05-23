import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiKey = environment.apiKey;
  private appUrl = environment.appURL;
  private apiUrl = `https://trello.com/1/authorize?expiration=1day&scope=read,write&key=${this.apiKey}&callback_method=fragment&return_url=http://${this.appUrl}/workspace/callback`;
  private token: string | null = null;
  constructor(private router: Router) {}

  getApiKeyTokenUrl(): string {
    if (this.getToken()) {
      return `&key=${environment.apiKey}&token=${this.getToken()}`;
    } else {
      this.router.navigate(['/workspace']);
      return '';
    }
  }

  getApiKeyTokenJson(): string {
    return `{ key: ${environment.apiKey}, token: ${this.getToken()} }`;
  }

  login(): void {
    window.location.href = this.apiUrl;
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
