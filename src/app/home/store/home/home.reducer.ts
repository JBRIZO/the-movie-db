import { createReducer, on } from '@ngrx/store';
import { IMoviesFetch } from '../../interfaces/movies-info-state.interface';
import { IMoviesMeta } from '../../interfaces/movies-response-meta.interface';
import * as HomeActions from './home.actions';
import {
  errorsInitialState,
  idsInitialState,
  loadingInitialState,
  metaInitialState,
} from './initial.state';

export interface HomeState {
  loading: IMoviesFetch<boolean, boolean>;
  errors: IMoviesFetch<string, null>;
  meta: IMoviesFetch<IMoviesMeta, IMoviesMeta>;
  ids: IMoviesFetch<number[], number[]>;
}

export const homeInitialState: HomeState = {
  loading: loadingInitialState,
  errors: errorsInitialState,
  meta: metaInitialState,
  ids: idsInitialState,
};

export const homeReducer = createReducer(
  homeInitialState,
  on(HomeActions.fetchPlayingNowStart, state => ({
    ...state,
    loading: { ...state.loading, playingNow: true },
  })),
  on(HomeActions.fetchUpcomingStart, state => ({
    ...state,
    loading: { ...state.loading, upcoming: true },
  })),
  on(HomeActions.fetchPopularStart, state => ({
    ...state,
    loading: { ...state.loading, popular: true },
  })),
  on(HomeActions.fetchTopRatedStart, state => ({
    ...state,
    loading: { ...state.loading, topRated: true },
  })),
  on(HomeActions.fetchPlayingNowSuccess, (state, action) => ({
    ...state,
    loading: { ...state.loading, playingNow: false },
    meta: { ...state.meta, playingNow: action.payload },
    ids: {
      ...state.ids,
      playingNow: [
        ...new Set([
          ...state.ids.playingNow,
          ...action.payload.results.map(movie => movie.id),
        ]),
      ],
    },
  })),
  on(HomeActions.fetchUpcomingSuccess, (state, action) => ({
    ...state,
    loading: { ...state.loading, upcoming: false },
    meta: { ...state.meta, upcoming: action.payload },
    ids: {
      ...state.ids,
      upcoming: [
        ...new Set([
          ...state.ids.upcoming,
          ...action.payload.results.map(movie => movie.id),
        ]),
      ],
    },
  })),
  on(HomeActions.fetchPopularSuccess, (state, action) => ({
    ...state,
    loading: { ...state.loading, popular: false },
    meta: { ...state.meta, popular: action.payload },
    ids: {
      ...state.ids,
      popular: [
        ...new Set([
          ...state.ids.popular,
          ...action.payload.results.map(movie => movie.id),
        ]),
      ],
    },
  })),
  on(HomeActions.fetchTopRatedSuccess, (state, action) => ({
    ...state,
    loading: { ...state.loading, topRated: false },
    meta: { ...state.meta, topRated: action.payload },
    ids: {
      ...state.ids,
      topRated: [
        ...new Set([
          ...state.ids.popular,
          ...action.payload.results.map(movie => movie.id),
        ]),
      ],
    },
  })),
  on(HomeActions.fetchPlayingNowFailure, (state, action) => ({
    ...state,
    loading: { ...state.loading, playingNow: false },
    errors: { ...state.errors, playingNow: action.payload },
  })),
  on(HomeActions.fetchUpcomingFailure, (state, action) => ({
    ...state,
    loading: { ...state.loading, upcoming: false },
    errors: { ...state.errors, upcoming: action.payload },
  })),
  on(HomeActions.fetchPopularFailure, (state, action) => ({
    ...state,
    loading: { ...state.loading, popular: false },
    errors: { ...state.errors, popular: action.payload },
  })),
  on(HomeActions.fetchTopRatedFailure, (state, action) => ({
    ...state,
    loading: { ...state.loading, topRated: false },
    errors: { ...state.errors, topRated: action.payload },
  }))
);
