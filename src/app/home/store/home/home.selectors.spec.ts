import { AppState } from 'src/app/store/app.store';
import { authInitialState } from 'src/app/auth/store/auth.reducer';
import { initialFavoriteState } from 'src/app/favorites/store/favorites.reducer';
import { initialListsState } from 'src/app/lists/store/lists.reducer';
import { specificMoviesInitialState } from 'src/app/movie-details/store/specific-movie.reducer';
import { searchInitialState } from 'src/app/search/store/search.reducer';
import { mockMoviesEntities } from 'src/app/shared/test/mock-movies';
import { mockMoviesState } from 'src/app/shared/test/mock-movies-state';
import {
  mockErrorsState,
  mockIdsState,
  mockLoadingState,
  mockMetaState,
} from '../../test/mock-home-store';
import { HomeState, homeInitialState } from './home.reducer';
import {
  selectHomeErrors,
  selectHomeLoading,
  selectHomeMeta,
  selectHomePlayingNow,
  selectHomePopular,
  selectHomeState,
  selectHomeTopRated,
  selectHomeUpcoming,
} from './home.selectors';

describe('Home selectors', () => {
  let mockHome: HomeState;
  let mockAppState: AppState;

  beforeEach(() => {
    mockHome = {
      loading: mockLoadingState,
      meta: mockMetaState,
      errors: mockErrorsState,
      ids: mockIdsState,
    };

    mockAppState = {
      auth: authInitialState,
      movie: mockMoviesState,
      home: mockHome,
      lists: initialListsState,
      favorites: initialFavoriteState,
      specificMovie: specificMoviesInitialState,
      search: searchInitialState,
    };
  });

  afterEach(() => {
    mockAppState = {
      auth: authInitialState,
      movie: mockMoviesState,
      home: homeInitialState,
      lists: initialListsState,
      favorites: initialFavoriteState,
      specificMovie: specificMoviesInitialState,
      search: searchInitialState,
    };
  });

  it('should select home state', () => {
    const result = selectHomeState(mockAppState);
    expect(result).toBe(mockHome);
  });

  it('should select errors ', () => {
    const result = selectHomeErrors(mockAppState);
    expect(result).toBe(mockErrorsState);
  });

  it('should select loading ', () => {
    const result = selectHomeLoading(mockAppState);
    expect(result).toBe(mockLoadingState);
  });

  it('should select meta ', () => {
    const result = selectHomeMeta(mockAppState);
    expect(result).toBe(mockMetaState);
  });

  it('should select home playing now', () => {
    const playingNow = {
      loading: mockLoadingState.playingNow,
      errors: mockErrorsState.playingNow,
      meta: mockMetaState.playingNow,
      movies: [
        mockMoviesEntities[mockIdsState.playingNow[0]],
        mockMoviesEntities[mockIdsState.playingNow[1]],
        mockMoviesEntities[mockIdsState.playingNow[2]],
      ],
    };
    const result = selectHomePlayingNow(mockAppState);
    expect(result).toEqual(playingNow);
  });

  it('should select home top rated', () => {
    const topRated = {
      loading: mockLoadingState.topRated,
      errors: mockErrorsState.topRated,
      meta: mockMetaState.topRated,
      movies: [
        mockMoviesEntities[mockIdsState.topRated[0]],
        mockMoviesEntities[mockIdsState.topRated[1]],
        mockMoviesEntities[mockIdsState.topRated[2]],
      ],
    };
    const result = selectHomeTopRated(mockAppState);
    expect(result).toEqual(topRated);
  });

  it('should select home popular', () => {
    const popular = {
      loading: mockLoadingState.popular,
      errors: mockErrorsState.popular,
      meta: mockMetaState.popular,
      movies: [
        mockMoviesEntities[mockIdsState.popular[0]],
        mockMoviesEntities[mockIdsState.popular[1]],
        mockMoviesEntities[mockIdsState.popular[2]],
      ],
    };
    const result = selectHomePopular(mockAppState);
    expect(result).toEqual(popular);
  });

  it('should select home upcoming', () => {
    const upcoming = {
      loading: mockLoadingState.upcoming,
      errors: mockErrorsState.upcoming,
      meta: mockMetaState.upcoming,
      movies: [
        mockMoviesEntities[mockIdsState.upcoming[0]],
        mockMoviesEntities[mockIdsState.upcoming[1]],
        mockMoviesEntities[mockIdsState.upcoming[2]],
      ],
    };
    const result = selectHomeUpcoming(mockAppState);
    expect(result).toEqual(upcoming);
  });
});
