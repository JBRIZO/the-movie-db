import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import { selectMovieEntities } from 'src/app/store/movies/movies.selectors';

export const selectSpecificMovieState = (state: AppState) =>
  state.specificMovie;

export const selectMovieDetailsState = createSelector(
  selectSpecificMovieState,
  state => state.details
);

export const selectReviewState = createSelector(
  selectSpecificMovieState,
  state => state.reviews
);

export const selectMovieReviews = createSelector(
  selectReviewState,
  state => state.result
);

export const selectAreMovieReviews = createSelector(
  selectMovieReviews,
  state => {
    let hasResults = false;
    if (state) {
      hasResults = state.length > 0;
    }
    return hasResults;
  }
);

export const selectMovieDetails = createSelector(
  selectMovieDetailsState,
  state => state.result
);

export const selectMovieAccountState = createSelector(
  selectMovieDetails,
  state => state?.account_states
);

export const selectMovieDetailsLoading = createSelector(
  selectMovieDetailsState,
  state => state.loading
);

export const selectMovieDetailsErrors = createSelector(
  selectMovieDetailsState,
  state => state.errors
);

export const selectSpecificSimilar = createSelector(
  selectSpecificMovieState,
  state => state.similar
);

export const selectSpecificRecommended = createSelector(
  selectSpecificMovieState,
  state => state.recommended
);

export const selectRecommendedMovies = createSelector(
  selectSpecificRecommended,
  selectMovieEntities,
  (specific, movies) => {
    const value = {
      errors: specific.errors,
      loading: specific.loading,
      meta: {
        page: specific.result?.page,
        total_pages: specific.result?.total_pages,
        total_results: specific.result?.total_results,
      },
      movies: specific.result?.ids.map(id => movies[id]),
    };
    return value;
  }
);

export const selectAreRecommendedMovies = createSelector(
  selectRecommendedMovies,
  state => {
    let hasResults = false;
    if (state.movies) {
      hasResults = state.movies.length > 0;
    }
    return hasResults;
  }
);

export const selectSimilarMovies = createSelector(
  selectSpecificSimilar,
  selectMovieEntities,
  (specific, movies) => {
    const value = {
      errors: specific.errors,
      loading: specific.loading,
      meta: {
        page: specific.result?.page,
        total_pages: specific.result?.total_pages,
        total_results: specific.result?.total_results,
      },
      movies: specific.result?.ids.map(id => movies[id]),
    };
    return value;
  }
);
