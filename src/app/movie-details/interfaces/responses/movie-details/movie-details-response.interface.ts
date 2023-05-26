import { IMoviesReponse } from 'src/app/home/interfaces/movies-response.interface';
import { IMovieReviewResponse } from '../movie-reviews/movie-review-response.interface';
import { IMovieDetails } from './movie-details.interface';

export type IMovieDetailsResponse = IMovieDetails & {
  similar: IMoviesReponse;
} & { recommendations: IMoviesReponse } & { reviews: IMovieReviewResponse };
