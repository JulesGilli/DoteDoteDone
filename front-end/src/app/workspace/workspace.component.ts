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
        width: 100vw;
        height: 100vh;
      }

      .right-side {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .app-top-bar {
        position: relative;
        z-index: 999;
      }

      @media (min-width: 500px) {
        .workspace-layout {
          display: flex;
        }
      }
    `,
  ],
})
export class WorkspaceComponent {
  title = 'front-end';
}
