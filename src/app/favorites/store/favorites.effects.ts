import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.store';
import { selectCurrentUser } from 'src/app/auth/store/auth.selectors';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { upsertManyMovies } from 'src/app/store/movies/movies.actions';
import { FavoriteService } from '../services/favorite.service';
import {
  addMovieToFavoriteSuccess,
  addMovieToFavorites,
  deleteFavorite,
  deleteFavoriteFailure,
  deleteFavoriteSuccess,
  loadFavorites,
  loadFavoritesSuccess,
} from './favorites.actions';

@Injectable()
export class FavoriteEffects {
  constructor(
    private actions$: Actions,
    private favoriteService: FavoriteService,
    private snackBarService: SnackbarService,
    private store: Store<AppState>
  ) {}

  upsertFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFavorites),
      concatLatestFrom(() => this.store.select(selectCurrentUser)),
      filter(([, user]) => !!user),
      switchMap(([action, user]) => {
        return this.favoriteService.getUserFavorites(action.page, user!.id);
      }),
      map(favorites => upsertManyMovies({ payload: favorites.results }))
    );
  });

  loadFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFavorites),
      concatLatestFrom(() => this.store.select(selectCurrentUser)),
      filter(([, user]) => !!user),
      switchMap(([action, user]) =>
        this.favoriteService.getUserFavorites(action.page, user!.id)
      ),
      map(favorites =>
        loadFavoritesSuccess({
          favoriteMovieIds: favorites.results.map(result => result.id),
          meta: {
            page: favorites.page,
            total_pages: favorites.total_pages,
            total_results: favorites.total_results,
          },
        })
      )
    );
  });

  addFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addMovieToFavorites),
      concatLatestFrom(() => this.store.select(selectCurrentUser)),
      filter(([, user]) => !!user),
      switchMap(([action, user]) =>
        this.favoriteService.markFavorite(action.movieId, true, user!.id).pipe(
          map(response => {
            this.snackBarService.openSnackBar('Favorite added succesfully!');
            return addMovieToFavoriteSuccess({ movieId: response });
          }),
          catchError(error => {
            this.snackBarService.openSnackBar(
              'An error ocurred when adding movie to favorites.'
            );
            return of(error);
          })
        )
      )
    );
  });

  deleteFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteFavorite),
      concatLatestFrom(() => this.store.select(selectCurrentUser)),
      filter(([, user]) => !!user),
      switchMap(([action, user]) =>
        this.favoriteService
          .markFavorite(action.favoriteMovieId, false, user!.id)
          .pipe(
            map(response => {
              this.snackBarService.openSnackBar(
                'Favorite deleted succesfully!',
                true
              );
              return deleteFavoriteSuccess({ movieId: response });
            }),
            catchError(error => {
              this.snackBarService.openSnackBar(
                'An error ocurred when deleting movie from favorites.',
                true
              );
              return of(deleteFavoriteFailure({ error: error }));
            })
          )
      )
    );
  });
}
