import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'app',
    loadChildren: () =>
      import('./workspace/workspace.routes').then((m) => m.workspaceRoutes),
  },
  {
    path: '**',
    redirectTo: 'app',
  },
];
