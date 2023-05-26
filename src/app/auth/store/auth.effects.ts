import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap, tap } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AuthLocalStorageService } from 'src/app/shared/services/auth-local-storage.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { IErrorResponse } from '../interfaces/error.response';
import { IGetSessionId } from '../interfaces/session-id-response.interface';
import { AuthHttpService } from '../services/auth-http.service';
import {
  logoutFailure,
  logoutStart,
  logoutSuccess,
  signInFailure,
  signInStart,
  signInSuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private snackBar: SnackbarService,
    private authHttp: AuthHttpService,
    private router: Router,
    private authStorage: AuthLocalStorageService
  ) {}

  logoutSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutSuccess),
        tap(() => {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('sessionId');
          localStorage.removeItem('expiresAt');
          localStorage.removeItem('requestToken');
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  logoutFailure = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutFailure),
        tap(() => {
          this.snackBar.openSnackBar('Unable to logout');
        })
      ),
    { dispatch: false }
  );

  logout = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutStart),
      switchMap(() => {
        return this.authHttp.deleteSession().pipe(
          switchMap(data => {
            if (data.success) {
              return of(logoutSuccess());
            } else {
              return of(
                logoutFailure({ payload: 'Unexpected Error Occurred' })
              );
            }
          }),
          catchError(errorResponse => {
            return of(
              logoutFailure({ payload: errorResponse.error.status_message })
            );
          })
        );
      })
    )
  );

  loginSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signInSuccess),
        tap((value: { payload: IUser }) => {
          this.authStorage.setElement('currentUser', value.payload);
          this.snackBar.openSnackBar('Login successful', false);
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  loginFailure = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signInFailure),
        tap(() => {
          this.snackBar.openSnackBar(
            'There was a problem when logging in.',
            true
          );
        })
      ),
    { dispatch: false }
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(signInStart),
      switchMap((data: { payload: string }) => {
        this.authStorage.setElement('requestToken', data.payload);
        return this.authHttp.postSessionId(data.payload).pipe(
          switchMap((session: IGetSessionId) => {
            const sessionId = session.session_id;
            this.authStorage.setElement('sessionId', sessionId);
            return this.authHttp.getuserInfo(sessionId).pipe(
              switchMap(user => {
                return of(signInSuccess({ payload: user }));
              }),
              catchError((errorResponse: { error: IErrorResponse }) => {
                return of(
                  signInFailure({ payload: errorResponse.error.status_message })
                );
              })
            );
          }),
          catchError((errorResponse: { error: IErrorResponse }) => {
            return of(
              signInFailure({ payload: errorResponse.error.status_message })
            );
          })
        );
      })
    )
  );
}
