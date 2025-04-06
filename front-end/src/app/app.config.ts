import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideDnd } from '@ng-dnd/core';
import { MultiBackend } from '@ng-dnd/multi-backend';
import { CustomTransitions } from './customMultiBackend';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideDnd({
      backend: MultiBackend,
      options: CustomTransitions,
    }),
  ],
};
