import { mockMoviesResponse } from '../../test/mock-response';
import { mockMovies } from '../../test/mock-results';
import {
  fetchPlayingNowFailure,
  fetchPlayingNowStart,
  fetchPlayingNowSuccess,
  fetchPopularFailure,
  fetchPopularStart,
  fetchPopularSuccess,
  fetchTopRatedFailure,
  fetchTopRatedStart,
  fetchTopRatedSuccess,
  fetchUpcomingFailure,
  fetchUpcomingStart,
  fetchUpcomingSuccess,
} from './home.actions';
import { HomeActionTypes } from './home.types';

describe('Home Actions', () => {
  it('Should fetch playing now start', () => {
    const page = 1;
    const action = fetchPlayingNowStart({ payload: page });
    expect(action.type).toEqual(HomeActionTypes.FETCH_PLAYING_NOW_START);
    expect(action.payload).toEqual(page);
  });

  it('Should fetch playing now success', () => {
    const result = mockMoviesResponse;
    const action = fetchPlayingNowSuccess({ payload: result });
    expect(action.type).toEqual(HomeActionTypes.FETCH_PLAYING_NOW_SUCCESS);
    expect(action.payload).toEqual(result);
  });

  it('Should fetch playing now failure', () => {
    const result = 'error';
    const action = fetchPlayingNowFailure({ payload: result });
    expect(action.type).toEqual(HomeActionTypes.FETCH_PLAYING_NOW_FAILURE);
    expect(action.payload).toEqual(result);
  });

  it('Should fetch top rated start', () => {
    const page = 1;
    const action = fetchTopRatedStart({ payload: page });
    expect(action.type).toEqual(HomeActionTypes.FETCH_TOP_RATED_START);
    expect(action.payload).toEqual(page);
  });

  it('Should fetch top rated success', () => {
    const result = mockMoviesResponse;
    const action = fetchTopRatedSuccess({ payload: result });
    expect(action.type).toEqual(HomeActionTypes.FETCH_TOP_RATED_SUCCESS);
    expect(action.payload).toEqual(result);
  });

  it('Should fetch top rated failure', () => {
    const result = 'error';
    const action = fetchTopRatedFailure({ payload: result });
    expect(action.type).toEqual(HomeActionTypes.FETCH_TOP_RATED_FAILURE);
    expect(action.payload).toEqual(result);
  });

  it('Should fetch upcoming start', () => {
    const page = 1;
    const action = fetchUpcomingStart({ payload: page });
    expect(action.type).toEqual(HomeActionTypes.FETCH_UPCOMING_START);
    expect(action.payload).toEqual(page);
  });

  it('Should fetch upcoming success', () => {
    const result = mockMoviesResponse;
    const action = fetchUpcomingSuccess({ payload: result });
    expect(action.type).toEqual(HomeActionTypes.FETCH_UPCOMING_SUCCESS);
    expect(action.payload).toEqual(result);
  });

  it('Should fetch upcoming failure', () => {
    const result = 'error';
    const action = fetchUpcomingFailure({ payload: result });
    expect(action.type).toEqual(HomeActionTypes.FETCH_UPCOMING_FAILURE);
    expect(action.payload).toEqual(result);
  });

  it('Should fetch popular start', () => {
    const page = 1;
    const action = fetchPopularStart({ payload: page });
    expect(action.type).toEqual(HomeActionTypes.FETCH_POPULAR_START);
    expect(action.payload).toEqual(page);
  });

  it('Should fetch popular success', () => {
    const result = mockMoviesResponse;
    const action = fetchPopularSuccess({ payload: result });
    expect(action.type).toEqual(HomeActionTypes.FETCH_POPULAR_SUCCESS);
    expect(action.payload).toEqual(result);
  });

  it('Should fetch popular failure', () => {
    const result = 'error';
    const action = fetchPopularFailure({ payload: result });
    expect(action.type).toEqual(HomeActionTypes.FETCH_POPULAR_FAILURE);
    expect(action.payload).toEqual(result);
  });
});
