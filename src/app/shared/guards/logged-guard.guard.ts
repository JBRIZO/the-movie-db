import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectCurrentUserLogged } from 'src/app/auth/store/auth.selectors';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

export const loggedInGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store);
  const router = inject(Router);
  const snackBar = inject(SnackbarService);

  return store.select(selectCurrentUserLogged).pipe(
    map(logged => {
      if (!logged) {
        snackBar.openSnackBar('You need to login to view this page', true);
        router.navigate(['/home']);
        return false;
      } else {
        return true;
      }
    })
  );
};
