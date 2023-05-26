import { IMeta } from 'src/app/shared/interfaces/meta-interface';
import { IMovie } from 'src/app/shared/interfaces/movie.interface';

export interface IFavoriteMoviesResponse extends IMeta {
  results: IMovie[];
}
