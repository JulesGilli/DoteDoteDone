import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const login = createActionGroup({
  source: 'Login',
  events: {
    submit: props<{ token: string }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const logout = createActionGroup({
  source: 'Logout',
  events: {
    submit: props<{ token: string }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});

export const checkAuth = createActionGroup({
  source: 'Check Auth',
  events: {
    submit: props<{ token: string }>(),
    success: emptyProps(),
    error: emptyProps(),
  },
});
