import { AppState } from 'src/app/store/app.store';
import { authInitialState } from 'src/app/auth/store/auth.reducer';
import { initialFavoriteState } from 'src/app/favorites/store/favorites.reducer';
import { homeInitialState } from 'src/app/home/store/home/home.reducer';
import { mockMoviesResponse } from 'src/app/home/test/mock-response';
import { initialListsState } from 'src/app/lists/store/lists.reducer';
import { specificMoviesInitialState } from 'src/app/movie-details/store/specific-movie.reducer';
import { mockMoviesState } from 'src/app/shared/test/mock-movies-state';
import { SearchState, searchInitialState } from './search.reducer';
import {
  selectSearchLoading,
  selectSearchMeta,
  selectSearchResults,
  selectSearchState,
} from './search.selectors';

describe('Search selectors', () => {
  let mockSearch: SearchState;
  let mockAppState: AppState;
  beforeEach(() => {
    mockSearch = {
      loading: false,
      results: mockMoviesResponse.results,
      meta: {
        page: 1,
        total_pages: 100,
        total_results: 500,
      },
    };

    mockAppState = {
      auth: authInitialState,
      movie: mockMoviesState,
      home: homeInitialState,
      lists: initialListsState,
      favorites: initialFavoriteState,
      specificMovie: specificMoviesInitialState,
      search: mockSearch,
    };
  });

  afterEach(() => {
    mockAppState = {
      auth: authInitialState,
      movie: mockMoviesState,
      home: homeInitialState,
      lists: initialListsState,
      favorites: initialFavoriteState,
      specificMovie: specificMoviesInitialState,
      search: searchInitialState,
    };
  });

  it('should select Specific state', () => {
    const result = selectSearchState(mockAppState);
    expect(result).toBe(mockSearch);
  });

  it('should select search loading', () => {
    const result = selectSearchLoading(mockAppState);
    expect(result).toBe(mockSearch.loading);
  });

  it('should select search results', () => {
    const result = selectSearchResults(mockAppState);
    expect(result).toBe(mockMoviesResponse.results);
  });

  it('should select search meta', () => {
    const result = selectSearchMeta(mockAppState);
    expect(result).toBe(mockSearch.meta);
  });
});
