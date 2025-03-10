import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isExpanded = false;

  constructor(private authService: AuthService) {}

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  logout(): void {
    this.authService.logout();
  }
}
