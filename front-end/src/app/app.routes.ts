import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'workspace',
    loadChildren: () => import('./workspace').then((m) => m.workspaceRoutes),
  },
  {
    path: '**',
    redirectTo: 'workspace',
  },
];
