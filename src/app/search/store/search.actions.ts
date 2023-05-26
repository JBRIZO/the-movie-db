import { SearchActionTypes } from './search.types';
import { createAction, props } from '@ngrx/store';
import { IMoviesReponse } from 'src/app/home/interfaces/movies-response.interface';

export const searchStart = createAction(
  SearchActionTypes.SEARCH_START,
  props<{ payload: { page: number; query: string } }>()
);

export const searchSuccess = createAction(
  SearchActionTypes.SEARCH_SUCCESS,
  props<{ payload: IMoviesReponse }>()
);

export const searchFailure = createAction(SearchActionTypes.SEARCH_FAILURE);

export const clearSearch = createAction(SearchActionTypes.CLEAR_SEARCH);
