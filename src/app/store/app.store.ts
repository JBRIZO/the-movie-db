import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from '../auth/store/auth.reducer';
import {
  favoritesReducer,
  FavoriteState,
} from '../favorites/store/favorites.reducer';
import { homeReducer, HomeState } from '../home/store/home/home.reducer';
import { listsReducer, ListsState } from '../lists/store/lists.reducer';
import {
  specificMoviesReducer,
  SpecificMoviesState,
} from '../movie-details/store/specific-movie.reducer';
import { searchReducer, SearchState } from '../search/store/search.reducer';
import { MovieState } from './movies/movies.entity';
import { movieReducer } from './movies/movies.reducer';

export interface AppState {
  auth: AuthState;
  home: HomeState;
  movie: MovieState;
  lists: ListsState;
  specificMovie: SpecificMoviesState;
  favorites: FavoriteState;
  search: SearchState;
}

export const storeReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  home: homeReducer,
  movie: movieReducer,
  lists: listsReducer,
  specificMovie: specificMoviesReducer,
  favorites: favoritesReducer,
  search: searchReducer,
};
