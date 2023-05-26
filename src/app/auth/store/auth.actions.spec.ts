import {
  logoutFailure,
  logoutStart,
  logoutSuccess,
  signInFailure,
  signInStart,
  signInSuccess,
} from './auth.actions';
import { AuthActionTypes } from './auth.types';

describe('Auth Actions', () => {
  it('Should sign in start', () => {
    const mockToken = 'token';
    const action = signInStart({ payload: mockToken });
    expect(action.type).toEqual(AuthActionTypes.SIGN_IN_START);
    expect(action.payload).toEqual(mockToken);
  });

  it('Should Sign In Succes', () => {
    const signInSuccessMock = {
      avatar: {
        gravatar: {
          hash: 'hash',
        },
      },
      id: 1,
      iso_639_1: 'iso',
      iso_3166_1: 'iso2',
      name: 'name',
      include_adult: false,
      username: 'username',
    };
    const action = signInSuccess({ payload: signInSuccessMock });
    expect(action.type).toEqual(AuthActionTypes.SIGN_IN_SUCCESS);
    expect(action.payload).toEqual(signInSuccessMock);
  });

  it('Should Sign In Failure', () => {
    const errorMock = 'Error Occurred';
    const action = signInFailure({ payload: errorMock });
    expect(action.type).toEqual(AuthActionTypes.SIGN_IN_FAILURE);
    expect(action.payload).toEqual(errorMock);
  });

  it('Should Logout Start', () => {
    const action = logoutStart();
    expect(action.type).toEqual(AuthActionTypes.LOGOUT_START);
  });

  it('Should Logout Success', () => {
    const action = logoutSuccess();
    expect(action.type).toEqual(AuthActionTypes.LOGOUT_SUCCESS);
  });

  it('Should Logout Failure', () => {
    const errorMock = 'Error Occurred';
    const action = logoutFailure({ payload: errorMock });
    expect(action.type).toEqual(AuthActionTypes.LOGOUT_FAILURE);
    expect(action.payload).toEqual(errorMock);
  });
});
