import { createAction, props } from '@ngrx/store';
import { AuthActionTypes } from './auth.types';
import { IUser } from 'src/app/shared/interfaces/user.interface';

export const signInStart = createAction(
  AuthActionTypes.SIGN_IN_START,
  props<{ payload: string }>()
);

export const signInSuccess = createAction(
  AuthActionTypes.SIGN_IN_SUCCESS,
  props<{ payload: IUser }>()
);

export const signInFailure = createAction(
  AuthActionTypes.SIGN_IN_FAILURE,
  props<{ payload: string }>()
);

export const logoutStart = createAction(AuthActionTypes.LOGOUT_START);
export const logoutSuccess = createAction(AuthActionTypes.LOGOUT_SUCCESS);
export const logoutFailure = createAction(
  AuthActionTypes.LOGOUT_FAILURE,
  props<{ payload: string }>()
);
