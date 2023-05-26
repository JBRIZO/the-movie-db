import {
  addMovieToFavoriteSuccess,
  deleteFavoriteSuccess,
  loadFavorites,
  loadFavoritesSuccess,
} from './favorites.actions';
import { favoritesReducer, initialFavoriteState } from './favorites.reducer';

describe('FavoritesReducer', () => {
  it('should update state on loadFavoritesSuccess action', () => {
    const meta = { page: 1, total_pages: 2, total_results: 10 };
    const favoriteMovieIds = [1, 2, 3];
    const action = loadFavoritesSuccess({ meta, favoriteMovieIds });
    const newState = favoritesReducer(initialFavoriteState, action);

    expect(newState.meta).toEqual(meta);
    expect(newState.loaded).toBe(true);
    expect(newState.favorites).toEqual(favoriteMovieIds);
  });

  it('should remove the movieId from favorites on deleteFavoriteSuccess action', () => {
    const initialState = {
      meta: { page: 1, total_pages: 2, total_results: 10 },
      favorites: [1, 2, 3],
      loaded: true,
    };
    const movieId = 2;
    const action = deleteFavoriteSuccess({ movieId });
    const newState = favoritesReducer(initialState, action);

    expect(newState.favorites).toEqual([1, 3]);
  });

  it('should add the movieId to favorites on addMovieToFavoriteSuccess action', () => {
    const initialState = {
      meta: { page: 1, total_pages: 2, total_results: 10 },
      favorites: [1, 2, 3],
      loaded: true,
    };
    const movieId = 4;
    const action = addMovieToFavoriteSuccess({ movieId });
    const newState = favoritesReducer(initialState, action);

    expect(newState.favorites).toEqual([1, 2, 3, 4]);
  });

  it('should return the same state for unknown action types', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = favoritesReducer(initialFavoriteState, action);

    expect(newState).toBe(initialFavoriteState);
  });
});
