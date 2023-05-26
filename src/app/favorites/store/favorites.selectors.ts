import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteState } from './favorites.reducer';
import * as fromFavorites from './favorites.reducer';
import { IFavoriteMoviesResponse } from '../interfaces/favorite-list-response.interface';
import { selectMovieEntities } from 'src/app/store/movies/movies.selectors';

export const selectFavoritesState = createFeatureSelector<FavoriteState>(
  fromFavorites.favoriteFeatureKey
);

export const selectFavoritesArray = createSelector(
  selectFavoritesState,
  state => state.favorites
);

export const selectFavoriteMovies = createSelector(
  selectFavoritesState,
  selectFavoritesArray,
  selectMovieEntities,
  (state, favoritesIds, movies) => {
    return {
      page: state.meta.page,
      results: favoritesIds.map(id => movies[id]),
      total_pages: state.meta.total_pages,
      total_results: state.meta.total_results,
    } as IFavoriteMoviesResponse;
  }
);

export const selectFavoritesPaginationMeta = createSelector(
  selectFavoritesState,
  state => state.meta
);

export const selectIsFavoritesLoaded = createSelector(
  selectFavoritesState,
  state => state.loaded
);
