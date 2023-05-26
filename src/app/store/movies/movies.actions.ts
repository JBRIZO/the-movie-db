import { createAction, props } from '@ngrx/store';
import { MoviesActionTypes } from './movies.types';
import { IMovie } from 'src/app/shared/interfaces/movie.interface';

export const upsertManyMovies = createAction(
  MoviesActionTypes.UPSERT_MANY,
  props<{ payload: IMovie[] }>()
);
