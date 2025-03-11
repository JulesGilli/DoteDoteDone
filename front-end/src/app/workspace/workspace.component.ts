import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from '../components/navbar/navbar.component';
import { TopBarComponent } from '../components/top-bar/top-bar.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TopBarComponent],
  template: `
    <div class="workspace-layout">
      <app-navbar></app-navbar>
      <div class="right-side">
        <app-top-bar></app-top-bar>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      .workspace-layout {
        display: flex;
        width: 100vw;
      }
      .right-side {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class WorkspaceComponent {
  title = 'front-end';
}
