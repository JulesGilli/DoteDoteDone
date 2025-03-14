import { Routes } from '@angular/router';

import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { WorkspaceComponent } from './workspace.component';
import { AllCardsComponent } from '../pages/all-cards/all-cards.component';
import { CallbackComponent } from '../components/callback/callback.component';
import { KanbanComponent } from '../pages/kanban/kanban.component';
import { UserPageComponent } from '../pages/user-page/user-page.component';

export const workspaceRoutes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {
        path: 'callback',
        component: CallbackComponent,
      },
      {
        path: 'all-cards',
        component: AllCardsComponent,
      },
      {
        path: 'kanban',
        component: KanbanComponent,
      },
      {
        path: 'user',
        component: UserPageComponent
      },
      {
        path: '**',
        redirectTo: 'kanban',
      },
    ],
  },
];
