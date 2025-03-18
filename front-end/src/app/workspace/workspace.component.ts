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

        app-navbar {
          position: absolute;
          z-index: 999;
          width: 100%;
        }

        app-navbar.hidden {
          pointer-events: none;
        }

        app-navbar {
          width: 100%;
          height: 60px;
        }

        app-navbar.hidden {
          visibility: hidden;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .right-side {
          flex: 1;
          display: flex;
          flex-direction: column;

          position: relative;
          z-index: 1;
        }
      }

      @media (min-width: 500px) {
        .workspace-layout {
          display: flex;

          app-navbar {
            position: relative;
            width: fit-content;
            height: 100vh;
          }
        }
      }
    `,
  ],
})
export class WorkspaceComponent {
  title = 'front-end';
}
