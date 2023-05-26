import { mockMoviesResponse } from 'src/app/home/test/mock-response';
import { clearSearch, searchStart, searchSuccess } from './search.actions';
import {
  searchInitialState,
  searchReducer,
  SearchState,
} from './search.reducer';

describe('Search Movie Reducer', () => {
  it('should return the default state with unknown action', () => {
    const action = { type: 'Unknown' };
    const state = searchReducer(searchInitialState, action);
    expect(state).toBe(searchInitialState);
  });

  it('should change for search start', () => {
    const payload = {
      page: 1,
      query: 'query',
    };
    const action = searchStart({
      payload: payload,
    });
    const state = searchReducer(searchInitialState, action);
    const newState: SearchState = {
      loading: true,
      results: searchInitialState.results,
      meta: searchInitialState.meta,
    };
    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });

  it('should change for search success', () => {
    const action = searchSuccess({ payload: mockMoviesResponse });
    const state = searchReducer(searchInitialState, action);
    const newState: SearchState = {
      loading: false,
      results: mockMoviesResponse.results,
      meta: {
        page: mockMoviesResponse.page,
        total_pages: mockMoviesResponse.total_pages,
        total_results: mockMoviesResponse.total_results,
      },
    };
    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });

  it('should change for clear search', () => {
    const action = clearSearch();
    const state = searchReducer(searchInitialState, action);
    const newState: SearchState = {
      loading: false,
      results: [],
      meta: searchInitialState.meta,
    };
    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });
});
