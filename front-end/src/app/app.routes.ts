import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'workspace',
    loadChildren: () => import('./workspace').then((m) => m.workspaceRoutes),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'workspace',
  },
];
