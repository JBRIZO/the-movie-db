import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectCurrentUserLogged } from '../store/auth.selectors';

export const loginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectCurrentUserLogged).pipe(
    map(logged => {
      if (logged) {
        router.navigate(['/home']);
        return false;
      } else {
        return true;
      }
    })
  );
};
