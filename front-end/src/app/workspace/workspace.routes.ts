import { Routes } from '@angular/router';

import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';
import { WorkspaceComponent } from './workspace.component';
import { CallbackComponent } from '../components/callback/callback.component';
import { CreateCardComponent } from '../components/create-card/create-card.component';

export const workspaceRoutes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {
        path: 'callback',
        component: CallbackComponent
      },
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'create-card',
        component: CreateCardComponent,
      },
      {
        path: '**',
        redirectTo: 'workspace',
      },
    ],
  },
];
