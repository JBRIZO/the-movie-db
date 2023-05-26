import { AppState } from 'src/app/store/app.store';
import { mockUser } from 'src/app/auth/test/mock-user';
import { initialFavoriteState } from 'src/app/favorites/store/favorites.reducer';
import { homeInitialState } from 'src/app/home/store/home/home.reducer';
import { initialListsState } from 'src/app/lists/store/lists.reducer';
import { specificMoviesInitialState } from 'src/app/movie-details/store/specific-movie.reducer';
import { searchInitialState } from 'src/app/search/store/search.reducer';
import { AuthState } from './auth.reducer';
import {
  selectAuthState,
  selectCurrentUser,
  selectCurrentUserErrors,
  selectCurrentUserLoading,
  selectCurrentUserLogged,
} from './auth.selectors';
import { moviesInitialState } from 'src/app/store/movies/movies.reducer';

describe('Auth selectors', () => {
  it('Should select authState', () => {
    const mockAuthState: AuthState = {
      isLoading: true,
      currentUser: null,
      authErrors: null,
    };
    const mockStore: AppState = {
      auth: mockAuthState,
      movie: moviesInitialState,
      home: homeInitialState,
      lists: initialListsState,
      specificMovie: specificMoviesInitialState,
      favorites: initialFavoriteState,
      search: searchInitialState,
    };
    const result = selectAuthState(mockStore);
    expect(result).toBe(mockAuthState);
  });

  it('Should select current User Loading', () => {
    const mockInitialState: AuthState = {
      isLoading: true,
      currentUser: null,
      authErrors: null,
    };
    const result = selectCurrentUserLoading.projector(mockInitialState);
    expect(result).toBeTrue();
  });

  it('Should select current User Errors', () => {
    const mockInitialState: AuthState = {
      isLoading: false,
      currentUser: null,
      authErrors: 'error',
    };
    const result = selectCurrentUserErrors.projector(mockInitialState);
    expect(result).toBe('error');
  });

  it('Should select curent User Logged in', () => {
    const mockInitialState: AuthState = {
      isLoading: false,
      currentUser: null,
      authErrors: null,
    };
    const result = selectCurrentUserLogged.projector(mockInitialState);
    expect(result).toBe(false);
  });

  it('Should select current User', () => {
    const userMock = mockUser;
    const mockInitialState: AuthState = {
      isLoading: false,
      currentUser: userMock,
      authErrors: null,
    };
    const result = selectCurrentUser.projector(mockInitialState);
    expect(result).toBe(userMock);
  });
});
