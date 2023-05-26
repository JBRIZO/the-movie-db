import { createAction, props } from '@ngrx/store';
import { IMoviesReponse } from 'src/app/home/interfaces/movies-response.interface';
import { IMovieDetailsResponse } from '../interfaces/responses/movie-details/movie-details-response.interface';
import { SpecificMovieActionTypes } from './specific-movie.types';

export const clearSpecificMovie = createAction(
  SpecificMovieActionTypes.CLEAR_SPECIFIC_MOVIES
);

export const fetchDetailsStart = createAction(
  SpecificMovieActionTypes.FETCH_DETAILS_START,
  props<{ payload: number }>()
);

export const fetchDetailsSuccess = createAction(
  SpecificMovieActionTypes.FETCH_DETAILS_SUCCESS,
  props<{ payload: IMovieDetailsResponse }>()
);

export const fetchDetailsFailure = createAction(
  SpecificMovieActionTypes.FETCH_DETAILS_FAILURE,
  props<{ payload: string }>()
);

export const fetchRecommendedStart = createAction(
  SpecificMovieActionTypes.FETCH_RECOMMENDED_START,
  props<{ payload: { movieId: number; page: number } }>()
);

export const fetchRecommendedSuccess = createAction(
  SpecificMovieActionTypes.FETCH_RECOMMENDED_SUCCESS,
  props<{ payload: IMoviesReponse }>()
);

export const fetchRecommendedFailure = createAction(
  SpecificMovieActionTypes.FETCH_RECOMMENDED_FAILURE,
  props<{ payload: string }>()
);

export const fetchSimilarStart = createAction(
  SpecificMovieActionTypes.FETCH_SIMILAR_START,
  props<{ payload: { movieId: number; page: number } }>()
);

export const fetchSimilarSuccess = createAction(
  SpecificMovieActionTypes.FETCH_SIMILAR_SUCCESS,
  props<{ payload: IMoviesReponse }>()
);

export const fetchSimilarFailure = createAction(
  SpecificMovieActionTypes.FETCH_SIMILAR_FAILURE,
  props<{ payload: string }>()
);

export const addToWatchlist = createAction(
  SpecificMovieActionTypes.ADD_TO_WATCHLIST_START,
  props<{ payload: number }>()
);

export const removeFromWatchList = createAction(
  SpecificMovieActionTypes.REMOVE_FROM_WATCHLIST_START,
  props<{ payload: number }>()
);

export const addRating = createAction(
  SpecificMovieActionTypes.ADD_RATING_START,
  props<{ payload: { movieId: number; rate: number } }>()
);

export const removeRating = createAction(
  SpecificMovieActionTypes.REMOVE_RATING_START,
  props<{ payload: number }>()
);

export const updateSpecificFavorite = createAction(
  SpecificMovieActionTypes.UPDATE_SPECIFIC_MOVIE_FAVORITE,
  props<{ payload: boolean }>()
);

export const updateAddSpecificRate = createAction(
  SpecificMovieActionTypes.UPDATE_ADD_MOVIE_RATE_SUCCESS,
  props<{ payload: number }>()
);

export const updateDeleteSpecificRate = createAction(
  SpecificMovieActionTypes.UPDATE_DELETE_MOVIE_RATE_SUCCESS
);

export const updateSpecificWatchlistSuccess = createAction(
  SpecificMovieActionTypes.UPDATE_SPECIFIC_MOVIE_WATCHLIST_SUCCESS,
  props<{ payload: boolean }>()
);
