import {
  deleteFavorite,
  deleteFavoriteFailure,
  deleteFavoriteSuccess,
  loadFavoriteFailure,
  loadFavorites,
  loadFavoritesSuccess,
} from './favorites.actions';

describe('FavoriteActions', () => {
  it('should fetch load favorites', () => {
    const action = loadFavorites({ page: 1 });
    expect(action.type).toEqual(
      '[Favorites FavoritesResolver] LOAD_USER_FAVORITES'
    );
  });

  it('should fetch load favorites success', () => {
    const favoritesArray = [1, 2];
    const meta = { page: 1, total_pages: 1, total_results: 1 };
    const action = loadFavoritesSuccess({
      favoriteMovieIds: favoritesArray,
      meta: meta,
    });
    expect(action.type).toEqual(
      '[FavoritesEffects loadFavorites$] LOAD_USER_FAVORITES_SUCCESS'
    );
    expect(action.favoriteMovieIds).toBe(favoritesArray);
  });

  it('should fetch load favorites failure', () => {
    const action = loadFavoriteFailure;
    expect(action.type).toEqual(
      '[FavoritesEffects loadFavorites$] LOAD_FAVORITES_FAILURE'
    );
  });

  it('should fetch delete favorite', () => {
    const id = 1;
    const action = deleteFavorite({ favoriteMovieId: id });
    expect(action.type).toEqual(
      '[Favorites favorites-preview] DELETE_USER_FAVORITE'
    );
    expect(action.favoriteMovieId).toBe(id);
  });

  it('should fetch delete favorite success', () => {
    const id = 1;
    const action = deleteFavoriteSuccess({ movieId: id });
    expect(action.type).toEqual(
      '[FavoritesEffects deleteFavorite$] DELETE_FAVORITE_SUCCESS'
    );
    expect(action.movieId).toBe(id);
  });

  it('should fetch delete favorite failure', () => {
    const error = Error('error');
    const action = deleteFavoriteFailure({ error: error });
    expect(action.type).toEqual(
      '[FavoritesEffects deleteFavorite$] DELETE_FAVORITE_FAILURE'
    );
    expect(action.error).toBe(error);
  });
});
