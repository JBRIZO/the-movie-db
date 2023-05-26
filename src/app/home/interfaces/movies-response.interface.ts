import { IMovie } from 'src/app/shared/interfaces/movie.interface';
import { IMoviesMeta } from './movies-response-meta.interface';

export interface IMoviesReponse extends IMoviesMeta {
  results: IMovie[];
}
