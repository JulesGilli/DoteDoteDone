import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-callback',
  imports: [],
  template: '<p>Authenticating...</p>',
})
export class CallbackComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const fragment = window.location.hash;
    const tokenMatch = fragment.match(/token=(.+)/);
    const errorMatch = fragment.match(/error=(.+)/);
    if (tokenMatch && !errorMatch) {
      const token = tokenMatch[1];
      this.authService.setToken(token);
      this.router.navigate(['/workspace/kanban']); // Redirect to dashboard after login
      console.log(token);
    } else {
      console.error('Token not found in URL fragment or user denied access');
      this.router.navigate(['/']); // Redirect back to login if no token
    }
  }
}
