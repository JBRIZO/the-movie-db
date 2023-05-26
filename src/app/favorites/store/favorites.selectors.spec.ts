import { authInitialState } from 'src/app/auth/store/auth.reducer';
import { homeInitialState } from 'src/app/home/store/home/home.reducer';
import { initialListsState } from 'src/app/lists/store/lists.reducer';
import { specificMoviesInitialState } from 'src/app/movie-details/store/specific-movie.reducer';
import { searchInitialState } from 'src/app/search/store/search.reducer';
import { AppState } from 'src/app/store/app.store';
import {
  mockFavoriteState,
  mockMovieState,
} from '../tests/store/mock-favorites-store';
import {
  selectFavoriteMovies,
  selectFavoritesArray,
  selectFavoritesState,
} from './favorites.selectors';

describe('Favorite Selectors', () => {
  let mockAppState: AppState;

  beforeEach(() => {
    mockAppState = {
      auth: authInitialState,
      home: homeInitialState,
      movie: mockMovieState,
      lists: initialListsState,
      favorites: mockFavoriteState,
      specificMovie: specificMoviesInitialState,
      search: searchInitialState,
    };
  });

  it('should select favorites state', () => {
    const result = selectFavoritesState.projector(mockAppState.favorites);
    expect(result).toEqual(mockAppState.favorites);
  });

  it('should select the array with the favorite movies ids', () => {
    const result = selectFavoritesArray.projector(mockAppState.favorites);
    expect(result).toEqual(mockAppState.favorites.favorites);
  });

  it('should select the movies which ids equals the array of favorites', () => {
    const result = selectFavoriteMovies(mockAppState);
    expect(result).toEqual({
      page: mockFavoriteState.meta.page,
      results: [mockMovieState.entities[1]!, mockMovieState.entities[2]!],
      total_pages: mockFavoriteState.meta.total_pages,
      total_results: mockFavoriteState.meta.total_results,
    });
  });
});
