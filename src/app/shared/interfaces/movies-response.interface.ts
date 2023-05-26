import { IMeta } from './meta-interface';
import { IMovie } from './movie.interface';

export interface IMoviesResponse extends IMeta {
  results: IMovie[];
}
