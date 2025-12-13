import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import {SignInService} from './service/signIn/sign-in-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(SignInService);
  const token = authService.getToken();

  if (token && !req.url.includes('/api/auth/auth')) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req);
};
