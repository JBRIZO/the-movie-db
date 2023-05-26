import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';

import { movieAdapter } from './movies.entity';

export const { selectIds, selectEntities, selectAll, selectTotal } =
  movieAdapter.getSelectors();

export const selectMovieState = (state: AppState) => state.movie;

export const selectMovieEntities = createSelector(
  selectMovieState,
  selectEntities
);
