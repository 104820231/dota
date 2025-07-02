// src/app/guards/auth-guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { map, take } from 'rxjs/operators'; // Para observables

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1), // Toma el primer valor y luego completa
    map(user => {
      const isAuth = !!user; // true si hay usuario, false si es null
      if (isAuth) {
        return true; // Si está autenticado, permite el acceso
      } else {
        // Si no está autenticado, redirige a la página de login
        return router.createUrlTree(['/auth']);
      }
    })
  );
};