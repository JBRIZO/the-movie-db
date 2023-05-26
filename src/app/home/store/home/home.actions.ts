import { createAction, props } from '@ngrx/store';
import { IMoviesReponse } from '../../interfaces/movies-response.interface';
import { HomeActionTypes } from './home.types';

export type HomeSuccessActions =
  | typeof fetchPlayingNowSuccess
  | typeof fetchUpcomingSuccess
  | typeof fetchPopularSuccess
  | typeof fetchTopRatedSuccess;

export const fetchPlayingNowStart = createAction(
  HomeActionTypes.FETCH_PLAYING_NOW_START,
  props<{ payload: number }>()
);

export const fetchUpcomingStart = createAction(
  HomeActionTypes.FETCH_UPCOMING_START,
  props<{ payload: number }>()
);

export const fetchPopularStart = createAction(
  HomeActionTypes.FETCH_POPULAR_START,
  props<{ payload: number }>()
);

export const fetchTopRatedStart = createAction(
  HomeActionTypes.FETCH_TOP_RATED_START,
  props<{ payload: number }>()
);

export const fetchPlayingNowSuccess = createAction(
  HomeActionTypes.FETCH_PLAYING_NOW_SUCCESS,
  props<{ payload: IMoviesReponse }>()
);

export const fetchUpcomingSuccess = createAction(
  HomeActionTypes.FETCH_UPCOMING_SUCCESS,
  props<{ payload: IMoviesReponse }>()
);

export const fetchPopularSuccess = createAction(
  HomeActionTypes.FETCH_POPULAR_SUCCESS,
  props<{ payload: IMoviesReponse }>()
);

export const fetchTopRatedSuccess = createAction(
  HomeActionTypes.FETCH_TOP_RATED_SUCCESS,
  props<{ payload: IMoviesReponse }>()
);

export const fetchPlayingNowFailure = createAction(
  HomeActionTypes.FETCH_PLAYING_NOW_FAILURE,
  props<{ payload: string }>()
);

export const fetchUpcomingFailure = createAction(
  HomeActionTypes.FETCH_UPCOMING_FAILURE,
  props<{ payload: string }>()
);

export const fetchPopularFailure = createAction(
  HomeActionTypes.FETCH_POPULAR_FAILURE,
  props<{ payload: string }>()
);

export const fetchTopRatedFailure = createAction(
  HomeActionTypes.FETCH_TOP_RATED_FAILURE,
  props<{ payload: string }>()
);
