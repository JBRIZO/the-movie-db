import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { IMovie } from 'src/app/shared/interfaces/movie.interface';

export const movieAdapter = createEntityAdapter<IMovie>();
export interface MovieState extends EntityState<IMovie> {}
