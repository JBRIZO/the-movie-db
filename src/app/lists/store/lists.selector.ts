import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IListDetails } from '../interfaces/list-details-response.interface';
import { createEntityAdapter } from '@ngrx/entity';
import { ListsState } from './lists.reducer';
import { IListResponse } from '../interfaces/movie-lists-response.interface';

const listsAdapter = createEntityAdapter<IListDetails>();
const { selectAll: selectAllListsEntities } = listsAdapter.getSelectors();

export const selectListsState = createFeatureSelector<ListsState>('lists');

export const selectListEntities = createSelector(
  selectListsState,
  selectAllListsEntities
);

export const selectLists = createSelector(
  selectListsState,
  selectListEntities,
  (state: ListsState, entities: IListDetails[]) => {
    return {
      page: state.meta.page,
      total_pages: state.meta.total_pages,
      total_results: state.meta.total_results,
      results: entities,
    } as IListResponse;
  }
);

export const selectListItems = createSelector(
  selectListsState,
  state => state.entities[state.selectListId!]!
);

export const selectIsListsLoaded = createSelector(
  selectListsState,
  state => state.loaded
);

export const selectSelectedListId = createSelector(
  selectListsState,
  state => state.selectListId
);
