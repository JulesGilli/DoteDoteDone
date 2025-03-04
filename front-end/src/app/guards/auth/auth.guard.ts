import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const _authService = inject(AuthService);
  const _router = inject(Router);

  if (_authService.isAuthenticated()) {
    return true;
  }

  _router.navigate(['/']);
  return false;
};
