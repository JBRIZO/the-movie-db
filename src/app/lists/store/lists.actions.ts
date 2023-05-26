import { createAction, props } from '@ngrx/store';
import { IListDetails } from '../interfaces/list-details-response.interface';
import { ListsActionsTypes } from './lists.types';
import { IMeta } from 'src/app/shared/interfaces/meta-interface';

export const loadLists = createAction(
  ListsActionsTypes.LOAD_LISTS,
  props<{ page: number }>()
);

export const loadListSuccess = createAction(
  ListsActionsTypes.LOAD_LISTS_SUCCESS,
  props<{ lists: IListDetails[]; meta: IMeta }>()
);

export const loadListFailure = createAction(
  ListsActionsTypes.LOAD_LISTS_FAILURE
);

export const upsertList = createAction(
  ListsActionsTypes.UPDATE_LIST,
  props<{ list: IListDetails }>()
);

export const loadListDetails = createAction(
  ListsActionsTypes.LOAD_LIST_DETAILS,
  props<{ listId: number }>()
);

export const loadListDetailsSucess = createAction(
  ListsActionsTypes.LOAD_LIST_DETAILS_SUCCESS,
  props<{ listDetails: IListDetails }>()
);

export const deleteMovieFromList = createAction(
  ListsActionsTypes.DELETE_MOVIE_FROM_LIST,
  props<{ movieId: number; listId: number }>()
);

export const deleteMovieFromListSucess = createAction(
  ListsActionsTypes.DELETE_MOVIE_FROM_LIST_SUCCESS,
  props<{ movieId: number; listId: number }>()
);

export const deleteMovieFromListFailure = createAction(
  ListsActionsTypes.DELETE_MOVIE_FROM_LIST_FAILURE
);

export const clearList = createAction(ListsActionsTypes.CLEAR_LIST);

export const clearListSuccess = createAction(
  ListsActionsTypes.CLEAR_LIST_SUCCESS
);

export const addMovieToList = createAction(
  ListsActionsTypes.ADD_MOVIE_TO_LIST,
  props<{ movieId: number; listId: number }>()
);

export const addMovieToListSuccess = createAction(
  ListsActionsTypes.ADD_MOVIE_TO_LIST_SUCCESS,
  props<{ listId: number }>()
);
export const createList = createAction(
  ListsActionsTypes.CREATE_LIST,
  props<{ name: string; description: string }>()
);

export const createListSuccess = createAction(
  ListsActionsTypes.CREATE_LIST_SUCCESS,
  props<{ listId: number }>()
);

export const createListWithMovie = createAction(
  ListsActionsTypes.CREATE_LIST_WITH_MOVIE,
  props<{ name: string; description: string; movieId: number }>()
);
