import { createReducer, on } from '@ngrx/store';
import { MovieReview } from '../interfaces/responses/movie-reviews/movie-review.interface';
import { ISpecificMovieState } from '../interfaces/responses/specific-movie-state.response';
import * as SpecificMovieActions from './specific-movie.actions';

import { IMoviesMeta } from 'src/app/home/interfaces/movies-response-meta.interface';
import {
  detailsInitialState,
  recommendedInitialState,
  reviewsInitialState,
  similarInitialState,
} from './specific-movie-initial.state';
import { SpecificMovieUtils } from './specific-movie.utils';
import { IMovieDetails } from '../interfaces/responses/movie-details/movie-details.interface';

type IReccommended = IMoviesMeta & { ids: number[] };

export interface SpecificMoviesState {
  details: ISpecificMovieState<IMovieDetails>;
  reviews: ISpecificMovieState<MovieReview[]>;
  recommended: ISpecificMovieState<IReccommended>;
  similar: ISpecificMovieState<IReccommended>;
}

export const specificMoviesInitialState: SpecificMoviesState = {
  details: detailsInitialState,
  reviews: reviewsInitialState,
  recommended: recommendedInitialState,
  similar: similarInitialState,
};

export const specificMoviesReducer = createReducer(
  specificMoviesInitialState,
  on(SpecificMovieActions.updateAddSpecificRate, (state, action) => {
    if (state.details.result && state.details.result.account_states) {
      return {
        ...state,
        details: {
          ...state.details,
          result: {
            ...state.details.result,
            account_states: {
              ...state.details.result?.account_states,
              watchlist: false,
              rated: { value: action.payload },
            },
          },
        },
      };
    } else {
      return { ...state };
    }
  }),

  on(SpecificMovieActions.updateDeleteSpecificRate, state => {
    if (state.details.result && state.details.result.account_states) {
      return {
        ...state,
        details: {
          ...state.details,
          result: {
            ...state.details.result,
            account_states: {
              ...state.details.result?.account_states,
              rated: false,
            },
          },
        },
      };
    } else {
      return { ...state };
    }
  }),

  on(SpecificMovieActions.updateSpecificWatchlistSuccess, (state, action) => {
    if (state.details.result && state.details.result.account_states) {
      return {
        ...state,
        details: {
          ...state.details,
          result: {
            ...state.details.result,
            account_states: {
              ...state.details.result?.account_states,
              watchlist: action.payload,
            },
          },
        },
      };
    } else {
      return { ...state };
    }
  }),

  on(SpecificMovieActions.updateSpecificFavorite, (state, action) => {
    if (state.details.result && state.details.result.account_states) {
      return {
        ...state,
        details: {
          ...state.details,
          result: {
            ...state.details.result,
            account_states: {
              ...state.details.result?.account_states,
              favorite: action.payload,
            },
          },
        },
      };
    } else {
      return { ...state };
    }
  }),

  on(SpecificMovieActions.fetchDetailsStart, state => ({
    ...state,
    details: { result: null, loading: true, errors: null },
  })),

  on(SpecificMovieActions.fetchDetailsSuccess, (state, action) => {
    const { recommendations, similar, reviews, ...movieDetails } =
      action.payload;

    return {
      ...state,
      details: {
        ...state.details,
        loading: false,
        result: { ...movieDetails },
      },
      reviews: {
        ...state.reviews,
        loading: false,
        result: reviews.results,
      },
      recommended: {
        ...state.recommended,
        loading: false,
        result: SpecificMovieUtils.handleResult(
          recommendations,
          state.recommended.result?.ids || []
        ),
      },
      similar: {
        ...state.similar,
        loading: false,
        result: SpecificMovieUtils.handleResult(
          similar,
          state.similar.result?.ids || []
        ),
      },
    };
  }),

  on(SpecificMovieActions.fetchDetailsFailure, (state, action) => ({
    ...state,
    details: {
      ...state.details,
      loading: false,
      errors: action.payload,
    },
  })),

  on(SpecificMovieActions.fetchRecommendedStart, state => ({
    ...state,
    recommended: { ...state.recommended, loading: true, errors: null },
  })),

  on(SpecificMovieActions.fetchRecommendedSuccess, (state, action) => ({
    ...state,
    recommended: {
      ...state.recommended,
      loading: false,
      result: SpecificMovieUtils.handleResult(
        action.payload,
        state.recommended.result?.ids || []
      ),
    },
  })),
  on(SpecificMovieActions.fetchRecommendedFailure, (state, action) => ({
    ...state,
    recommended: {
      ...state.recommended,
      loading: false,
      errors: action.payload,
    },
  })),

  on(SpecificMovieActions.fetchSimilarStart, state => ({
    ...state,
    similar: { ...state.similar, loading: true, errors: null },
  })),

  on(SpecificMovieActions.fetchSimilarSuccess, (state, action) => ({
    ...state,
    similar: {
      ...state.similar,
      loading: false,
      result: SpecificMovieUtils.handleResult(
        action.payload,
        state.similar.result?.ids || []
      ),
    },
  })),
  on(SpecificMovieActions.fetchSimilarFailure, (state, action) => ({
    ...state,
    similar: {
      ...state.similar,
      loading: false,
      errors: action.payload,
    },
  })),

  on(SpecificMovieActions.clearSpecificMovie, state => ({
    ...state,
    similar: similarInitialState,
    recommended: recommendedInitialState,
    details: detailsInitialState,
    reviews: reviewsInitialState,
  }))
);
