import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import { SearchState } from './search.reducer';

export const selectSearchState = (state: AppState) => state.search;

export const selectSearchLoading = createSelector(
  selectSearchState,
  (state: SearchState) => state.loading
);

export const selectSearchResults = createSelector(
  selectSearchState,
  (state: SearchState) => state.results
);

export const selectSearchMeta = createSelector(
  selectSearchState,
  (state: SearchState) => state.meta
);
