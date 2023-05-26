import { createReducer, on } from '@ngrx/store';
import { IMeta } from 'src/app/shared/interfaces/meta-interface';
import {
  addMovieToFavoriteSuccess,
  deleteFavoriteSuccess,
  loadFavorites,
  loadFavoritesSuccess,
} from './favorites.actions';

export const favoriteFeatureKey = 'favorites';

export interface FavoriteState {
  meta: IMeta;
  favorites: number[];
  loaded: boolean;
}

export const initialFavoriteState: FavoriteState = {
  meta: { page: 0, total_pages: 0, total_results: 0 },
  favorites: [],
  loaded: false,
};

export const favoritesReducer = createReducer(
  initialFavoriteState,
  on(loadFavorites, (state): FavoriteState => {
    return {
      ...state,
      loaded: state.meta.page > 0,
    };
  }),

  on(loadFavoritesSuccess, (state, action): FavoriteState => {
    return {
      meta: action.meta,
      loaded: true,
      favorites: [...new Set([...state.favorites, ...action.favoriteMovieIds])],
    };
  }),

  on(deleteFavoriteSuccess, (state, action) => {
    return {
      ...state,
      favorites: state.favorites.filter(id => id !== action.movieId),
    };
  }),

  on(addMovieToFavoriteSuccess, (state, action): FavoriteState => {
    return {
      ...state,
      favorites: [...state.favorites, action.movieId],
    };
  })
);
