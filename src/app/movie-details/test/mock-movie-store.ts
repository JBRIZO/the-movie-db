import { mockMovies } from 'src/app/home/test/mock-results';
import { mockMovieDetailsResponse } from './mock-movie-details.response';
import { mockReviews } from './mock-movie-reviews';

const { reviews, similar, recommendations, ...movieDetails } =
  mockMovieDetailsResponse;

export const mockDetailsState = {
  loading: false,
  errors: null,
  result: movieDetails,
};

export const mockReviewsState = {
  loading: true,
  errors: 'Error',
  result: mockReviews,
};

export const mockRecommendedState = {
  loading: false,
  errors: null,
  result: {
    page: 1,
    total_results: 0,
    total_pages: 0,
    ids: mockMovies.map(movie => movie.id),
  },
};

export const mockSimilarState = {
  loading: false,
  errors: null,
  result: {
    page: 1,
    total_results: 0,
    total_pages: 0,
    ids: mockMovies.map(movie => movie.id),
  },
};
