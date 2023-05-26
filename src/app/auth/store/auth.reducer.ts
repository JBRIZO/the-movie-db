import { createReducer, on } from '@ngrx/store';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AuthLocalStorageService } from 'src/app/shared/services/auth-local-storage.service';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isLoading: boolean;
  currentUser: IUser | null;
  authErrors: string | null;
}

export const authInitialState: AuthState = {
  isLoading: false,
  currentUser: AuthLocalStorageService.getCurrentUser(),
  authErrors: null,
};

export const authReducer = createReducer(
  authInitialState,
  on(AuthActions.signInStart, state => ({
    ...state,
    isLoading: true,
  })),

  on(AuthActions.signInSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    authErrors: null,
    currentUser: action.payload,
  })),

  on(AuthActions.signInFailure, (state, action) => ({
    ...state,
    isLoading: false,
    authErrors: action.payload,
  })),

  on(AuthActions.logoutStart, state => ({
    ...state,
    isLoading: true,
  })),

  on(AuthActions.logoutSuccess, state => ({
    ...state,
    currentUser: null,
    isLoading: false,
  })),

  on(AuthActions.logoutFailure, (state, action) => ({
    ...state,
    isLoading: false,
    authErrors: action.payload,
  }))
);
