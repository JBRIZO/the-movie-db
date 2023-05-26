import { createReducer, on } from '@ngrx/store';
import { IMoviesMeta } from 'src/app/home/interfaces/movies-response-meta.interface';
import * as SearchActions from './search.actions';
import { IMovie } from 'src/app/shared/interfaces/movie.interface';

export interface SearchState {
  loading: boolean;
  results: IMovie[];
  meta: IMoviesMeta;
}

export const searchInitialState: SearchState = {
  loading: false,
  results: [],
  meta: { page: 0, total_pages: 0, total_results: 0 },
};

export const searchReducer = createReducer(
  searchInitialState,
  on(SearchActions.searchStart, state => ({
    ...state,
    loading: true,
  })),
  on(SearchActions.searchSuccess, (state, action) => ({
    ...state,
    loading: false,
    results: [...state.results, ...action.payload.results],
    meta: {
      page: action.payload.page,
      total_pages: action.payload.total_pages,
      total_results: action.payload.total_results,
    },
  })),

  on(SearchActions.searchFailure, state => ({
    ...state,
    loading: false,
    results: [],
  })),

  on(SearchActions.clearSearch, state => ({
    ...state,
    results: [],
    meta: { page: 0, total_pages: 0, total_results: 0 },
  }))
);
