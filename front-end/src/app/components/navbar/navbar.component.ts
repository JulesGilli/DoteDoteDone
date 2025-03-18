import { Component, inject } from '@angular/core';
import { AuthService } from '../../services';
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private readonly _authService = inject(AuthService);
  isExpanded = false;

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
    console.log('expanded', this.isExpanded);
  }

  logout(): void {
    this._authService.logout();
  }
}
