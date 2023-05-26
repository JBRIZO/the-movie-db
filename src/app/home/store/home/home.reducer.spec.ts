import { homeInitialState, homeReducer } from './home.reducer';

import * as HomeActions from './home.actions';
import { mockMoviesResponse } from '../../test/mock-response';

describe('homeReducer', () => {
  it('should handle fetchPlayingNowStart action', () => {
    const action = HomeActions.fetchPlayingNowStart({ payload: 1 });
    const state = homeReducer(homeInitialState, action);

    expect(state.loading.playingNow).toBe(true);
  });

  it('should handle fetchUpcomingStart action', () => {
    const action = HomeActions.fetchUpcomingStart({ payload: 1 });
    const state = homeReducer(homeInitialState, action);

    expect(state.loading.upcoming).toBe(true);
  });

  it('should handle fetchPopularStart action', () => {
    const action = HomeActions.fetchPopularStart({ payload: 1 });
    const state = homeReducer(homeInitialState, action);

    expect(state.loading.popular).toBe(true);
  });

  it('should handle fetchTopRatedStart action', () => {
    const action = HomeActions.fetchTopRatedStart({ payload: 1 });
    const state = homeReducer(homeInitialState, action);

    expect(state.loading.topRated).toBe(true);
  });

  it('should handle fetchPlayingNowSuccess action', () => {
    const action = HomeActions.fetchPlayingNowSuccess({
      payload: mockMoviesResponse,
    });
    const state = homeReducer(homeInitialState, action);

    expect(state.loading.playingNow).toBe(false);
  });

  it('should handle fetchUpcomingSuccess action', () => {
    const action = HomeActions.fetchUpcomingSuccess({
      payload: mockMoviesResponse,
    });
    const state = homeReducer(homeInitialState, action);

    expect(state.loading.upcoming).toBe(false);
  });

  it('should handle fetchPopularSuccess action', () => {
    const action = HomeActions.fetchPopularSuccess({
      payload: mockMoviesResponse,
    });
    const state = homeReducer(homeInitialState, action);

    expect(state.loading.popular).toBe(false);
  });

  it('should handle fetchTopRatedSuccess action', () => {
    const action = HomeActions.fetchTopRatedSuccess({
      payload: mockMoviesResponse,
    });
    const state = homeReducer(homeInitialState, action);

    expect(state.loading.topRated).toBe(false);
  });

  it('should handle fetchPlayingNowFailure action', () => {
    const action = HomeActions.fetchPlayingNowFailure({ payload: 'Error' });
    const state = homeReducer(homeInitialState, action);

    expect(state.loading.playingNow).toBe(false);
  });

  it('should handle fetchUpcomingFailure action', () => {
    const action = HomeActions.fetchUpcomingFailure({ payload: 'Error' });
    const state = homeReducer(homeInitialState, action);

    expect(state.loading.upcoming).toBe(false);
  });

  it('should handle fetchPopularFailure action', () => {
    const action = HomeActions.fetchPopularFailure({ payload: 'Error' });
    const state = homeReducer(homeInitialState, action);

    expect(state.loading.popular).toBe(false);
  });

  it('should handle fetchTopRatedFailure action', () => {
    const action = HomeActions.fetchTopRatedFailure({ payload: 'Error' });
    const state = homeReducer(homeInitialState, action);

    expect(state.loading.topRated).toBe(false);
  });

  it('should handle unknown action', () => {
    const action = { type: 'Unknown Action' };
    const state = homeReducer(homeInitialState, action);

    expect(state).toBe(homeInitialState);
  });
});
