import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, of, switchMap } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SpecificMovieHttpService } from '../services/specific-movie-http.service';
import { updateSpecificWatchlistSuccess } from './specific-movie.actions';
import { SpecificMovieActionTypes } from './specific-movie.types';

@Injectable()
export class SpecificMovieWatchlistEffects {
  constructor(
    private actions$: Actions,
    private specificHttp: SpecificMovieHttpService,
    private snackBarService: SnackbarService
  ) {}

  addToWatchlist = createEffect(() =>
    this.actions$.pipe(
      ofType(SpecificMovieActionTypes.ADD_TO_WATCHLIST_START),
      switchMap(
        (data: {
          type: SpecificMovieActionTypes.ADD_TO_WATCHLIST_START;
          payload: number;
        }) => {
          return this.specificHttp.postWatchlist(true, data.payload).pipe(
            switchMap(response => {
              this.snackBarService.openSnackBar(
                'Added Successfully to watchlist',
                false
              );
              return of(updateSpecificWatchlistSuccess({ payload: true }));
            }),
            catchError(errorResponse => {
              this.snackBarService.openSnackBar(
                'Failed adding to watchlist',
                true
              );
              return EMPTY;
            })
          );
        }
      )
    )
  );

  removeFromWatchlist = createEffect(() =>
    this.actions$.pipe(
      ofType(SpecificMovieActionTypes.REMOVE_FROM_WATCHLIST_START),
      switchMap(
        (data: {
          type: SpecificMovieActionTypes.REMOVE_FROM_WATCHLIST_START;
          payload: number;
        }) => {
          return this.specificHttp.postWatchlist(false, data.payload).pipe(
            switchMap(response => {
              this.snackBarService.openSnackBar(
                'Removed from watchlist successfully',
                true
              );
              return of(updateSpecificWatchlistSuccess({ payload: false }));
            }),
            catchError(errorResponse => {
              this.snackBarService.openSnackBar(
                'Failed removing from watchlist',
                true
              );
              return EMPTY;
            })
          );
        }
      )
    )
  );
}
