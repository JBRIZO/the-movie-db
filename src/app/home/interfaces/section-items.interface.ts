import { IMoviesMeta } from './movies-response-meta.interface';

export interface ISectionItems {
  loading: boolean;
  errors: string | null;
  meta: IMoviesMeta;
  ids: number[];
}
