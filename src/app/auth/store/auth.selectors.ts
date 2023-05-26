import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import { AuthState } from './auth.reducer';

export const selectAuthState = (state: AppState) => state.auth;

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.currentUser
);

export const selectCurrentUserLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);

export const selectCurrentUserErrors = createSelector(
  selectAuthState,
  (state: AuthState) => state.authErrors
);

export const selectCurrentUserLogged = createSelector(
  selectAuthState,
  (state: AuthState) => !!state.currentUser
);
