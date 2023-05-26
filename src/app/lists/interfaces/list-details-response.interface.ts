import { IMovie } from 'src/app/shared/interfaces/movie.interface';

export interface IListDetails {
  created_by?: string;
  description?: string;
  favorite_count?: number;
  id?: string;
  items: IMovie[];
  item_count?: number;
  iso_639_1?: string;
  name?: string;
  poster_path?: string | null;
  list_type?: string;
}
