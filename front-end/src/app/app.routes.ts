import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'workspace',
    loadChildren: () => import('./workspace').then((m) => m.workspaceRoutes),
  },
  {
    path: '**',
    redirectTo: 'workspace/kanban',
  },
];
