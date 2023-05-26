import { AppState } from 'src/app/store/app.store';
import { authInitialState } from 'src/app/auth/store/auth.reducer';
import { initialFavoriteState } from 'src/app/favorites/store/favorites.reducer';
import { homeInitialState } from 'src/app/home/store/home/home.reducer';
import { initialListsState } from 'src/app/lists/store/lists.reducer';
import { searchInitialState } from 'src/app/search/store/search.reducer';
import { mockMoviesState } from 'src/app/shared/test/mock-movies-state';
import {
  mockDetailsState,
  mockRecommendedState,
  mockReviewsState,
  mockSimilarState,
} from '../test/mock-movie-store';
import {
  SpecificMoviesState,
  specificMoviesInitialState,
} from './specific-movie.reducer';
import {
  selectAreMovieReviews,
  selectAreRecommendedMovies,
  selectMovieAccountState,
  selectMovieDetails,
  selectMovieDetailsErrors,
  selectMovieDetailsLoading,
  selectMovieDetailsState,
  selectReviewState,
  selectSpecificMovieState,
  selectSpecificRecommended,
  selectSpecificSimilar,
} from './specific-movie.selectors';

describe('Speficic movie selectors', () => {
  let mockSpecific: SpecificMoviesState;
  let mockAppState: AppState;
  beforeEach(() => {
    mockSpecific = {
      similar: mockSimilarState,
      reviews: mockReviewsState,
      details: mockDetailsState,
      recommended: mockRecommendedState,
    };

    mockAppState = {
      auth: authInitialState,
      movie: mockMoviesState,
      home: homeInitialState,
      lists: initialListsState,
      favorites: initialFavoriteState,
      specificMovie: mockSpecific,
      search: searchInitialState,
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
    const result = selectSpecificMovieState(mockAppState);
    expect(result).toBe(mockSpecific);
  });

  it('should select selectMovieDetailsState ', () => {
    const result = selectMovieDetailsState(mockAppState);
    expect(result).toBe(mockDetailsState);
  });

  it('should select selectReviewState ', () => {
    const result = selectReviewState(mockAppState);
    expect(result).toBe(mockReviewsState);
  });

  it('should select selectAreMovieReviews ', () => {
    const result = selectAreMovieReviews(mockAppState);
    expect(result).toBe(mockReviewsState.result.length > 0);
  });

  it('should select selectMovieDetails ', () => {
    const result = selectMovieDetails(mockAppState);
    expect(result).toBe(mockDetailsState.result);
  });

  it('should select selectMovieAccountState ', () => {
    const result = selectMovieAccountState(mockAppState);
    expect(result).toBe(mockDetailsState.result.account_states);
  });

  it('should select selectMovieDetailsLoading ', () => {
    const result = selectMovieDetailsLoading(mockAppState);
    expect(result).toBe(mockDetailsState.loading);
  });

  it('should select selectMovieDetailsErrors', () => {
    const result = selectMovieDetailsErrors(mockAppState);
    expect(result).toBe(mockDetailsState.errors);
  });

  it('should select selectSpecificSimilar', () => {
    const result = selectSpecificSimilar(mockAppState);
    expect(result).toBe(mockSimilarState);
  });

  it('should select selectSpecificRecommended', () => {
    const result = selectSpecificRecommended(mockAppState);
    expect(result).toBe(mockRecommendedState);
  });

  it('should select selectAreRecommendedMovies', () => {
    const result = selectAreRecommendedMovies(mockAppState);
    expect(result).toBe(mockRecommendedState.result.ids.length > 0);
  });
});
