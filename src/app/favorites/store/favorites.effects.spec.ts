import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { selectCurrentUser } from 'src/app/auth/store/auth.selectors';
import { mockUser } from 'src/app/auth/test/mock-user';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AppState } from 'src/app/store/app.store';
import { upsertManyMovies } from 'src/app/store/movies/movies.actions';
import { FavoriteService } from '../services/favorite.service';
import { mockFavoriteMovies } from '../tests/mocks/mock-favorite-movies';
import {
  addMovieToFavoriteSuccess,
  addMovieToFavorites,
  deleteFavorite,
  deleteFavoriteFailure,
  deleteFavoriteSuccess,
  loadFavorites,
  loadFavoritesSuccess,
} from './favorites.actions';
import { FavoriteEffects } from './favorites.effects';

describe('FavoriteEffects', () => {
  let actions$: Observable<Action>;
  let effects: FavoriteEffects;
  let favoriteService: jasmine.SpyObj<FavoriteService>;
  let snackbarService: jasmine.SpyObj<SnackbarService>;
  let store: MockStore<AppState>;

  beforeEach(waitForAsync(() => {
    const favoriteServiceSpy = jasmine.createSpyObj('FavoriteService', [
      'getUserFavorites',
      'markFavorite',
    ]);
    const snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', [
      'openSnackBar',
    ]);

    TestBed.configureTestingModule({
      providers: [
        FavoriteEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: FavoriteService, useValue: favoriteServiceSpy },
        { provide: SnackbarService, useValue: snackbarServiceSpy },
      ],
    });

    effects = TestBed.inject(FavoriteEffects);
    favoriteService = TestBed.inject(
      FavoriteService
    ) as jasmine.SpyObj<FavoriteService>;
    snackbarService = TestBed.inject(
      SnackbarService
    ) as jasmine.SpyObj<SnackbarService>;
    store = TestBed.inject(MockStore);
  }));

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('upsertFavorites$', () => {
    it('should call favoriteService.getUserFavorites and dispatch upsertManyMovies action on success', () => {
      const page = 1;
      const favorite = mockFavoriteMovies;
      const action = loadFavorites({ page });
      store.overrideSelector(selectCurrentUser, mockUser);

      favoriteService.getUserFavorites.and.returnValue(of(favorite));

      actions$ = of(action);

      effects.upsertFavorites$.subscribe(result => {
        expect(result).toEqual(upsertManyMovies({ payload: favorite.results }));
        expect(favoriteService.getUserFavorites).toHaveBeenCalledWith(
          page,
          mockUser.id
        );
      });
    });

    it('should not call favoriteService.getUserFavorites if user is not available', () => {
      const page = 1;
      const action = loadFavorites({ page });
      store.overrideSelector(selectCurrentUser, null);

      actions$ = of(action);

      effects.upsertFavorites$.subscribe(result => {
        expect(result).toBeUndefined();
        expect(favoriteService.getUserFavorites).not.toHaveBeenCalled();
      });
    });
  });

  describe('loadFavorites$', () => {
    it('should call favoriteService.getUserFavorites and dispatch loadFavoritesSuccess action on success', () => {
      const page = 1;
      const favorite = mockFavoriteMovies;
      const action = loadFavorites({ page });
      store.overrideSelector(selectCurrentUser, mockUser);

      favoriteService.getUserFavorites.and.returnValue(of(favorite));

      actions$ = of(action);

      effects.loadFavorites$.subscribe(result => {
        expect(result).toEqual(
          loadFavoritesSuccess({
            favoriteMovieIds: favorite.results.map(result => result.id),
            meta: {
              page: favorite.page,
              total_pages: favorite.total_pages,
              total_results: favorite.total_results,
            },
          })
        );
        expect(favoriteService.getUserFavorites).toHaveBeenCalledWith(
          page,
          mockUser.id
        );
      });
    });

    it('should not call favoriteService.getUserFavorites if user is not available', () => {
      const page = 1;
      const action = loadFavorites({ page });
      store.overrideSelector(selectCurrentUser, null);

      actions$ = of(action);

      effects.loadFavorites$.subscribe(result => {
        expect(result).toBeUndefined();
        expect(favoriteService.getUserFavorites).not.toHaveBeenCalled();
      });
    });
  });

  describe('addFavorite$', () => {
    it('should call favoriteService.markFavorite and dispatch addMovieToFavoriteSuccess action on success', () => {
      const movieId = 1;
      const action = addMovieToFavorites({ movieId });
      store.overrideSelector(selectCurrentUser, mockUser);

      favoriteService.markFavorite.and.returnValue(of(movieId));

      actions$ = of(action);

      effects.addFavorite$.subscribe(result => {
        expect(result).toEqual(addMovieToFavoriteSuccess({ movieId: movieId }));
        expect(favoriteService.markFavorite).toHaveBeenCalledWith(
          movieId,
          true,
          mockUser.id
        );
        expect(snackbarService.openSnackBar).toHaveBeenCalledWith(
          'Favorite added succesfully!'
        );
      });
    });

    it('should call snackbarService.openSnackBar and dispatch error action on failure', () => {
      const movieId = 1;
      const error = new Error('Error');
      const action = addMovieToFavorites({ movieId });
      store.overrideSelector(selectCurrentUser, mockUser);

      favoriteService.markFavorite.and.returnValue(throwError(() => error));

      actions$ = of(action);

      effects.addFavorite$.subscribe(result => {
        expect(result).toEqual(error);
        expect(favoriteService.markFavorite).toHaveBeenCalledWith(
          movieId,
          true,
          mockUser.id
        );
        expect(snackbarService.openSnackBar).toHaveBeenCalledWith(
          'An error ocurred when adding movie to favorites.'
        );
      });
    });

    it('should not call favoriteService.markFavorite if user is not available', () => {
      const movieId = 1;
      const user = null;
      const action = addMovieToFavorites({ movieId });
      store.overrideSelector(selectCurrentUser, user);

      actions$ = of(action);

      effects.addFavorite$.subscribe(result => {
        expect(result).toBeUndefined();
        expect(favoriteService.markFavorite).not.toHaveBeenCalled();
        expect(snackbarService.openSnackBar).not.toHaveBeenCalled();
      });
    });
  });

  describe('deleteFavorite$', () => {
    it('should call favoriteService.markFavorite and dispatch deleteFavoriteSuccess action on success', () => {
      const favoriteMovieId = 1;
      const action = deleteFavorite({ favoriteMovieId });
      store.overrideSelector(selectCurrentUser, mockUser);

      favoriteService.markFavorite.and.returnValue(of(favoriteMovieId));

      actions$ = of(action);

      effects.deleteFavorite$.subscribe(result => {
        expect(result).toEqual(
          deleteFavoriteSuccess({ movieId: favoriteMovieId })
        );
        expect(favoriteService.markFavorite).toHaveBeenCalledWith(
          favoriteMovieId,
          false,
          mockUser.id
        );
        expect(snackbarService.openSnackBar).toHaveBeenCalledWith(
          'Favorite deleted succesfully!',
          true
        );
      });
    });

    it('should call snackbarService.openSnackBar and dispatch deleteFavoriteFailure action on failure', () => {
      const favoriteMovieId = 1;
      const error = new Error('Error');
      const action = deleteFavorite({ favoriteMovieId });
      store.overrideSelector(selectCurrentUser, mockUser);

      favoriteService.markFavorite.and.returnValue(throwError(() => error));

      actions$ = of(action);

      effects.deleteFavorite$.subscribe(result => {
        expect(result).toEqual(deleteFavoriteFailure({ error: error }));
        expect(favoriteService.markFavorite).toHaveBeenCalledWith(
          favoriteMovieId,
          false,
          mockUser.id
        );
        expect(snackbarService.openSnackBar).toHaveBeenCalled();
      });
    });

    it('should not call favoriteService.markFavorite if user is not available', () => {
      const favoriteMovieId = 1;
      const user = null;
      const action = deleteFavorite({ favoriteMovieId });
      store.overrideSelector(selectCurrentUser, user);

      actions$ = of(action);

      effects.deleteFavorite$.subscribe(result => {
        expect(result).toBeUndefined();
        expect(favoriteService.markFavorite).not.toHaveBeenCalled();
        expect(snackbarService.openSnackBar).not.toHaveBeenCalled();
      });
    });
  });
});
