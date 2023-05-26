import { mockMoviesResponse } from 'src/app/home/test/mock-response';
import { mockMovieDetails } from '../test/mock-movie-details';
import { mockMovieDetailsResponse } from '../test/mock-movie-details.response';
import {
  detailsInitialState,
  recommendedInitialState,
  reviewsInitialState,
  similarInitialState,
} from './specific-movie-initial.state';
import {
  clearSpecificMovie,
  fetchDetailsFailure,
  fetchDetailsStart,
  fetchDetailsSuccess,
  fetchRecommendedFailure,
  fetchRecommendedStart,
  fetchRecommendedSuccess,
  fetchSimilarFailure,
  fetchSimilarStart,
  fetchSimilarSuccess,
  updateAddSpecificRate,
  updateDeleteSpecificRate,
  updateSpecificFavorite,
  updateSpecificWatchlistSuccess,
} from './specific-movie.actions';
import {
  specificMoviesInitialState,
  specificMoviesReducer,
  SpecificMoviesState,
} from './specific-movie.reducer';

describe('Specific Movie Reducer', () => {
  it('should return the default state with unknown action', () => {
    const action = { type: 'Unknown' };
    const state = specificMoviesReducer(specificMoviesInitialState, action);
    expect(state).toBe(specificMoviesInitialState);
  });

  describe('Update', () => {
    it('should change for add rate', () => {
      const action = updateAddSpecificRate({ payload: 10 });
      const mockInitial = {
        ...specificMoviesInitialState,
        details: {
          ...specificMoviesInitialState.details,
          result: mockMovieDetails,
        },
      };
      const state = specificMoviesReducer(mockInitial, action);
      const newState: SpecificMoviesState = {
        details: {
          ...specificMoviesInitialState.details,
          result: {
            ...mockInitial.details.result,
            account_states: {
              id: mockInitial.details.result.account_states?.id,
              watchlist: mockInitial.details.result.account_states
                ?.watchlist as boolean,
              favorite: mockInitial.details.result.account_states
                ?.favorite as boolean,
              rated: {
                value: 10,
              },
            },
          },
        },
        reviews: reviewsInitialState,
        recommended: recommendedInitialState,
        similar: similarInitialState,
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should change for delete rating', () => {
      const action = updateDeleteSpecificRate();
      const mockAccountStates = {
        id: 505642,
        rated: { value: 10 },
        watchlist: false,
        favorite: false,
      };
      const mockInitial = {
        ...specificMoviesInitialState,
        details: {
          ...specificMoviesInitialState.details,
          result: {
            ...mockMovieDetails,
            account_states: mockAccountStates,
          },
        },
      };
      const state = specificMoviesReducer(mockInitial, action);
      const newState: SpecificMoviesState = {
        details: {
          ...specificMoviesInitialState.details,
          result: {
            ...mockInitial.details.result,
            account_states: {
              ...mockAccountStates,
              rated: false,
            },
          },
        },
        reviews: reviewsInitialState,
        recommended: recommendedInitialState,
        similar: similarInitialState,
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should change for watchlist', () => {
      const action = updateSpecificWatchlistSuccess({ payload: true });
      const mockAccountStates = {
        id: 505642,
        rated: { value: 10 },
        watchlist: false,
        favorite: false,
      };
      const mockInitial = {
        ...specificMoviesInitialState,
        details: {
          ...specificMoviesInitialState.details,
          result: {
            ...mockMovieDetails,
            account_states: mockAccountStates,
          },
        },
      };
      const state = specificMoviesReducer(mockInitial, action);
      const newState: SpecificMoviesState = {
        details: {
          ...specificMoviesInitialState.details,
          result: {
            ...mockInitial.details.result,
            account_states: {
              ...mockAccountStates,
              watchlist: true,
            },
          },
        },
        reviews: reviewsInitialState,
        recommended: recommendedInitialState,
        similar: similarInitialState,
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should change for favorite', () => {
      const action = updateSpecificFavorite({ payload: true });
      const mockAccountStates = {
        id: 505642,
        rated: { value: 10 },
        watchlist: false,
        favorite: false,
      };
      const mockInitial = {
        ...specificMoviesInitialState,
        details: {
          ...specificMoviesInitialState.details,
          result: {
            ...mockMovieDetails,
            account_states: mockAccountStates,
          },
        },
      };
      const state = specificMoviesReducer(mockInitial, action);
      const newState: SpecificMoviesState = {
        details: {
          ...specificMoviesInitialState.details,
          result: {
            ...mockInitial.details.result,
            account_states: {
              ...mockAccountStates,
              favorite: true,
            },
          },
        },
        reviews: reviewsInitialState,
        recommended: recommendedInitialState,
        similar: similarInitialState,
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('Details ', () => {
    it('should change for details start', () => {
      const action = fetchDetailsStart({ payload: 12314 });
      const state = specificMoviesReducer(specificMoviesInitialState, action);
      const newState: SpecificMoviesState = {
        details: { result: null, errors: null, loading: true },
        reviews: reviewsInitialState,
        recommended: recommendedInitialState,
        similar: similarInitialState,
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should change for details success', () => {
      const action = fetchDetailsSuccess({ payload: mockMovieDetailsResponse });
      const state = specificMoviesReducer(specificMoviesInitialState, action);
      const { reviews, similar, recommendations, ...details } =
        mockMovieDetailsResponse;
      const newState: SpecificMoviesState = {
        details: { result: details, errors: null, loading: false },
        reviews: { ...reviewsInitialState, result: reviews.results },
        recommended: {
          ...recommendedInitialState,
          result: {
            page: recommendations.page,
            total_pages: recommendations.total_pages,
            total_results: recommendations.total_results,
            ids: recommendations.results.map(res => res.id),
          },
        },
        similar: {
          ...similarInitialState,
          result: {
            page: similar.page,
            total_pages: similar.total_pages,
            total_results: similar.total_results,
            ids: similar.results.map(res => res.id),
          },
        },
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should change for details failure', () => {
      const action = fetchDetailsFailure({ payload: 'Error' });
      const state = specificMoviesReducer(specificMoviesInitialState, action);
      const newState: SpecificMoviesState = {
        details: { result: null, errors: 'Error', loading: false },
        reviews: reviewsInitialState,
        recommended: recommendedInitialState,
        similar: similarInitialState,
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('Recommended', () => {
    it('should change for recommended start', () => {
      const action = fetchRecommendedStart({
        payload: { page: 1, movieId: 123 },
      });
      const state = specificMoviesReducer(specificMoviesInitialState, action);
      const newState: SpecificMoviesState = {
        details: detailsInitialState,
        reviews: reviewsInitialState,
        recommended: { ...recommendedInitialState, loading: true },
        similar: similarInitialState,
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should change for recommended success', () => {
      const action = fetchRecommendedSuccess({
        payload: mockMoviesResponse,
      });
      const state = specificMoviesReducer(specificMoviesInitialState, action);
      const newState: SpecificMoviesState = {
        details: detailsInitialState,
        reviews: reviewsInitialState,
        recommended: {
          loading: false,
          errors: null,
          result: {
            page: mockMoviesResponse.page,
            total_pages: mockMoviesResponse.total_pages,
            total_results: mockMoviesResponse.total_results,
            ids: mockMoviesResponse.results.map(res => res.id),
          },
        },
        similar: similarInitialState,
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should fetch recommended failure', () => {
      const action = fetchRecommendedFailure({ payload: 'Error' });
      const state = specificMoviesReducer(specificMoviesInitialState, action);
      const newState: SpecificMoviesState = {
        details: detailsInitialState,
        reviews: reviewsInitialState,
        similar: similarInitialState,
        recommended: {
          loading: false,
          errors: 'Error',
          result: recommendedInitialState.result,
        },
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('Similar', () => {
    it('should change for similar start', () => {
      const action = fetchSimilarStart({
        payload: { page: 1, movieId: 123 },
      });
      const state = specificMoviesReducer(specificMoviesInitialState, action);
      const newState: SpecificMoviesState = {
        details: detailsInitialState,
        reviews: reviewsInitialState,
        recommended: recommendedInitialState,
        similar: { ...similarInitialState, loading: true },
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should change for similar success', () => {
      const action = fetchSimilarSuccess({
        payload: mockMoviesResponse,
      });
      const state = specificMoviesReducer(specificMoviesInitialState, action);
      const newState: SpecificMoviesState = {
        details: detailsInitialState,
        reviews: reviewsInitialState,
        similar: {
          loading: false,
          errors: null,
          result: {
            page: mockMoviesResponse.page,
            total_pages: mockMoviesResponse.total_pages,
            total_results: mockMoviesResponse.total_results,
            ids: mockMoviesResponse.results.map(res => res.id),
          },
        },
        recommended: recommendedInitialState,
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should fetch similar failure', () => {
      const action = fetchSimilarFailure({ payload: 'Error' });
      const state = specificMoviesReducer(specificMoviesInitialState, action);
      const newState: SpecificMoviesState = {
        details: detailsInitialState,
        reviews: reviewsInitialState,
        recommended: recommendedInitialState,
        similar: {
          loading: false,
          errors: 'Error',
          result: similarInitialState.result,
        },
      };
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  it('should clear the movies', () => {
    const action = clearSpecificMovie();
    const state = specificMoviesReducer(specificMoviesInitialState, action);
    const newState: SpecificMoviesState = {
      similar: similarInitialState,
      recommended: recommendedInitialState,
      details: detailsInitialState,
      reviews: reviewsInitialState,
    };
    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });
});
