import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-workspace',
  imports: [RouterOutlet, NavbarComponent],
  template: `<div><app-navbar /><router-outlet /></div>`,
  styles: `
    div {
      display: flex;
      width: 100dvw;
    }
  `,
})
export class WorkspaceComponent {
  title = 'front-end';
}
