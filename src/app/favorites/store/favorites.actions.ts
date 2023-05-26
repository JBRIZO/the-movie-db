import { createAction, props } from '@ngrx/store';
import { FavoriteActionTypes } from './favorites.types';
import { IMeta } from 'src/app/shared/interfaces/meta-interface';

export const loadFavorites = createAction(
  FavoriteActionTypes.LOAD_FAVORITES,
  props<{ page: number }>()
);

export const loadFavoritesSuccess = createAction(
  FavoriteActionTypes.LOAD_FAVORITES_SUCESS,
  props<{ favoriteMovieIds: number[]; meta: IMeta }>()
);

export const loadFavoriteFailure = createAction(
  FavoriteActionTypes.LOAD_FAVORITES_FAILURE
);

export const deleteFavorite = createAction(
  FavoriteActionTypes.DELETE_FAVORITE,
  props<{ favoriteMovieId: number }>()
);

export const deleteFavoriteSuccess = createAction(
  FavoriteActionTypes.DELETE_FAVORITE_SUCCESS,
  props<{ movieId: number }>()
);

export const deleteFavoriteFailure = createAction(
  FavoriteActionTypes.DELETE_FAVORITE_FAILURE,
  props<{ error: Error }>()
);

export const addMovieToFavorites = createAction(
  FavoriteActionTypes.ADD_FAVORITE,
  props<{ movieId: number }>()
);

export const addMovieToFavoriteSuccess = createAction(
  FavoriteActionTypes.ADD_FAVORITE_SUCCESS,
  props<{ movieId: number }>()
);
