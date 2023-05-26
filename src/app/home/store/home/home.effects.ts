import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, of, switchMap } from 'rxjs';
import { IMoviesResponse } from 'src/app/shared/interfaces/movies-response.interface';
import { upsertManyMovies } from 'src/app/store/movies/movies.actions';
import { HomeHttpService } from '../../services/home-http.service';
import {
  HomeSuccessActions,
  fetchPlayingNowFailure,
  fetchPlayingNowSuccess,
  fetchPopularFailure,
  fetchPopularSuccess,
  fetchTopRatedFailure,
  fetchTopRatedSuccess,
  fetchUpcomingFailure,
  fetchUpcomingSuccess,
} from './home.actions';
import { HomeActionTypes, HomeStartActionsTypes } from './home.types';

@Injectable()
export class HomeEffects {
  constructor(private actions$: Actions, private homeHttp: HomeHttpService) {}

  fetchSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(
        HomeActionTypes.FETCH_PLAYING_NOW_SUCCESS,
        HomeActionTypes.FETCH_POPULAR_SUCCESS,
        HomeActionTypes.FETCH_TOP_RATED_SUCCESS,
        HomeActionTypes.FETCH_UPCOMING_SUCCESS
      ),
      switchMap(
        (data: { type: HomeSuccessActions; payload: IMoviesResponse }) => {
          return of(upsertManyMovies({ payload: data.payload.results }));
        }
      )
    )
  );

  possibleActions = {
    [HomeActionTypes.FETCH_PLAYING_NOW_START]: {
      success: fetchPlayingNowSuccess,
      function: this.homeHttp.getNowPlaying,
      failure: fetchPlayingNowFailure,
    },
    [HomeActionTypes.FETCH_POPULAR_START]: {
      success: fetchPopularSuccess,
      function: this.homeHttp.getPopular,
      failure: fetchPopularFailure,
    },
    [HomeActionTypes.FETCH_TOP_RATED_START]: {
      success: fetchTopRatedSuccess,
      function: this.homeHttp.getTopRated,
      failure: fetchTopRatedFailure,
    },
    [HomeActionTypes.FETCH_UPCOMING_START]: {
      success: fetchUpcomingSuccess,
      function: this.homeHttp.getUpcoming,
      failure: fetchUpcomingFailure,
    },
  };

  fetchStart = createEffect(() =>
    this.actions$.pipe(
      ofType(
        HomeActionTypes.FETCH_PLAYING_NOW_START,
        HomeActionTypes.FETCH_POPULAR_START,
        HomeActionTypes.FETCH_TOP_RATED_START,
        HomeActionTypes.FETCH_UPCOMING_START
      ),
      mergeMap((data: { type: HomeStartActionsTypes; payload: number }) => {
        const successAction = this.possibleActions[data.type].success;
        const failureAction = this.possibleActions[data.type].failure;
        const requestFunction = this.possibleActions[data.type].function.bind(
          this.homeHttp
        );
        return requestFunction(data.payload).pipe(
          switchMap(moviesResponse => {
            return of(successAction({ payload: moviesResponse }));
          }),
          catchError(errorResponse => {
            return of(
              failureAction({ payload: errorResponse.error.status_message })
            );
          })
        );
      })
    )
  );
}
