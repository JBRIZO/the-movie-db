import { movieAdapter, MovieState } from './movies.entity';

import * as MovieActions from './movies.actions';
import { createReducer, on } from '@ngrx/store';

export const moviesInitialState: MovieState = movieAdapter.getInitialState();

export const movieReducer = createReducer(
  moviesInitialState,
  on(MovieActions.upsertManyMovies, (state, action) =>
    movieAdapter.upsertMany(action.payload, state)
  )
);
