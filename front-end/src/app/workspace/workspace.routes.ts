import { Routes } from '@angular/router';

import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';
import { WorkspaceComponent } from './workspace.component';
import {AllCardsComponent} from '../pages/all-cards/all-cards.component';

export const workspaceRoutes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'all-cards',
        component: AllCardsComponent,
      },
      {
        path: '**',
        redirectTo: 'workspace',
      },
    ],
  },
];
