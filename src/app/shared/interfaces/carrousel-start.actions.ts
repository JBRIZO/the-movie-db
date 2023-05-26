import {
  fetchPlayingNowStart,
  fetchPopularStart,
  fetchTopRatedStart,
  fetchUpcomingStart,
} from 'src/app/home/store/home/home.actions';
import {
  fetchRecommendedStart,
  fetchSimilarStart,
} from 'src/app/movie-details/store/specific-movie.actions';

export type HomeStartActions =
  | typeof fetchPlayingNowStart
  | typeof fetchUpcomingStart
  | typeof fetchPopularStart
  | typeof fetchTopRatedStart;

export type SpecificStartActions =
  | typeof fetchSimilarStart
  | typeof fetchRecommendedStart;
