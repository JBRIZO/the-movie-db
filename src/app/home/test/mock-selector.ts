import { mockMovies } from './mock-results';

export const mockCarrouselResponse = {
  loading: true,
  errors: null,
  meta: { page: 1, total_pages: 10, total_results: 10 },
  movies: mockMovies,
};
