import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, mergeMap, of, switchMap } from 'rxjs';
import {
  addMovieToFavoriteSuccess,
  deleteFavoriteSuccess,
} from 'src/app/favorites/store/favorites.actions';
import { IMoviesReponse } from 'src/app/home/interfaces/movies-response.interface';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { upsertManyMovies } from 'src/app/store/movies/movies.actions';
import { IMovieDetailsResponse } from '../interfaces/responses/movie-details/movie-details-response.interface';
import { SpecificMovieHttpService } from '../services/specific-movie-http.service';
import {
  clearSpecificMovie,
  fetchDetailsFailure,
  fetchDetailsStart,
  fetchDetailsSuccess,
  fetchRecommendedFailure,
  fetchRecommendedStart,
  fetchRecommendedSuccess,
  fetchSimilarFailure,
  fetchSimilarStart,
  fetchSimilarSuccess,
  updateSpecificFavorite,
} from './specific-movie.actions';

@Injectable()
export class SpecificMovieEffects {
  constructor(
    private actions$: Actions,
    private specificHttp: SpecificMovieHttpService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  favoriteAddSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addMovieToFavoriteSuccess),
      map(() => updateSpecificFavorite({ payload: true }))
    )
  );

  favoriteDeleteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteFavoriteSuccess),
      map(() => updateSpecificFavorite({ payload: false }))
    )
  );

  fetchDetailsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchDetailsSuccess),
      mergeMap((data: { type: string; payload: IMovieDetailsResponse }) => {
        const { recommendations, similar } = data.payload;

        const values = [...recommendations.results, ...similar.results];
        return of(upsertManyMovies({ payload: values }));
      })
    )
  );

  fetchDetailsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchDetailsFailure),
        mergeMap((value: { type: string; payload: string }) => {
          this.router.navigate(['/home']);
          this.snackbarService.openSnackBar(value.payload, true);
          return EMPTY;
        })
      ),
    {
      dispatch: false,
    }
  );

  fetchDetailsStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchDetailsStart),
      mergeMap(() => {
        return of(clearSpecificMovie());
      })
    )
  );

  recommendedOrSimilarSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchRecommendedSuccess, fetchSimilarSuccess),
      mergeMap((data: { type: string; payload: IMoviesReponse }) => {
        return of(upsertManyMovies({ payload: data.payload.results }));
      })
    )
  );

  movieDetailsAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchDetailsStart),
      switchMap((data: { type: string; payload: number }) => {
        return this.specificHttp.getMovieDetails(data.payload).pipe(
          switchMap(movieResponse => {
            return of(fetchDetailsSuccess({ payload: movieResponse }));
          }),
          catchError(errorResponse => {
            return of(
              fetchDetailsFailure({
                payload: errorResponse.error.status_message,
              })
            );
          })
        );
      })
    )
  );

  recommendedActions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchRecommendedStart),
      mergeMap(
        (data: {
          type: string;
          payload: { page: number; movieId: number };
        }) => {
          const { payload } = data;
          const { page, movieId } = payload;
          return this.specificHttp.getRecommended(page, movieId).pipe(
            switchMap(moviesResponse =>
              of(fetchRecommendedSuccess({ payload: moviesResponse }))
            ),
            catchError(errorResponse =>
              of(
                fetchRecommendedFailure({
                  payload: errorResponse.error.status_message,
                })
              )
            )
          );
        }
      )
    )
  );

  similarActions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSimilarStart),
      mergeMap(
        (data: {
          type: string;
          payload: { page: number; movieId: number };
        }) => {
          const { payload } = data;
          const { page, movieId } = payload;
          return this.specificHttp.getSimilar(page, movieId).pipe(
            switchMap(moviesResponse =>
              of(fetchSimilarSuccess({ payload: moviesResponse }))
            ),
            catchError(errorResponse =>
              of(
                fetchSimilarFailure({
                  payload: errorResponse.error.status_message,
                })
              )
            )
          );
        }
      )
    )
  );
}
