import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isExpanded = false;
  constructor(){
    document.documentElement.style.setProperty('--navbar-width', '60px');
  }

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
    const newWidth = this.isExpanded ? '250px' : '60px';
    document.documentElement.style.setProperty('--navbar-width', newWidth);
  }
}
