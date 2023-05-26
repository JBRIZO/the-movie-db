import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, of, switchMap } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SpecificMovieHttpService } from '../services/specific-movie-http.service';
import {
  updateAddSpecificRate,
  updateDeleteSpecificRate,
} from './specific-movie.actions';

import { SpecificMovieActionTypes } from './specific-movie.types';

@Injectable()
export class SpecificMovieRateEffects {
  constructor(
    private actions$: Actions,
    private specificHttp: SpecificMovieHttpService,
    private snackBarService: SnackbarService
  ) {}

  addRating = createEffect(() =>
    this.actions$.pipe(
      ofType(SpecificMovieActionTypes.ADD_RATING_START),
      switchMap(
        (data: {
          type: SpecificMovieActionTypes.ADD_RATING_START;
          payload: { movieId: number; rate: number };
        }) => {
          return this.specificHttp
            .postRateMovie(data.payload.movieId, data.payload.rate)
            .pipe(
              switchMap(response => {
                this.snackBarService.openSnackBar('Rated Successfully', false);
                return of(
                  updateAddSpecificRate({ payload: data.payload.rate })
                );
              }),
              catchError(errorResponse => {
                this.snackBarService.openSnackBar(
                  'Failed Rating the movie',
                  true
                );
                return EMPTY;
              })
            );
        }
      )
    )
  );

  removeRating = createEffect(() =>
    this.actions$.pipe(
      ofType(SpecificMovieActionTypes.REMOVE_RATING_START),
      switchMap(
        (data: {
          type: SpecificMovieActionTypes.REMOVE_RATING_START;
          payload: number;
        }) => {
          return this.specificHttp.deleteRateMovie(data.payload).pipe(
            switchMap(response => {
              this.snackBarService.openSnackBar(
                'Rating Removed successfully',
                true
              );
              return of(updateDeleteSpecificRate());
            }),
            catchError(errorResponse => {
              this.snackBarService.openSnackBar('Failed removing rating', true);
              return EMPTY;
            })
          );
        }
      )
    )
  );
}
