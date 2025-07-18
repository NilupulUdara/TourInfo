import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('jwtToken');

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
