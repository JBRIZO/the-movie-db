import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, take, throwError } from 'rxjs';
import { mockErrorResponse } from 'src/app/auth/test/mock-error-response';
import {
  addMovieToFavoriteSuccess,
  deleteFavoriteSuccess,
} from 'src/app/favorites/store/favorites.actions';
import { mockMoviesResponse } from 'src/app/home/test/mock-response';
import { upsertManyMovies } from 'src/app/store/movies/movies.actions';
import { SpecificMovieHttpService } from '../services/specific-movie-http.service';
import { mockMovieDetailsResponse } from '../test/mock-movie-details.response';
import {
  clearSpecificMovie,
  fetchDetailsFailure,
  fetchDetailsStart,
  fetchDetailsSuccess,
  fetchRecommendedSuccess,
  fetchSimilarSuccess,
  updateSpecificFavorite,
} from './specific-movie.actions';
import { SpecificMovieEffects } from './specific-movie.effects';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

describe('Specific Movie Effects', () => {
  let actions$: Actions;
  let effects: SpecificMovieEffects;
  let mockHttp: any;
  let mockSnackBar: any;

  beforeEach(async () => {
    mockHttp = jasmine.createSpyObj('specificHttp', [
      'getMovieDetails',
      'getRecommended',
      'getSimilar',
    ]);

    mockSnackBar = jasmine.createSpyObj('snackBar', ['openSnackBar']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [
        SpecificMovieEffects,
        provideMockActions(() => actions$),
        {
          provide: SnackbarService,
          useValue: mockSnackBar,
        },
        {
          provide: SpecificMovieHttpService,
          useValue: mockHttp,
        },
      ],
    }).compileComponents();

    effects = TestBed.inject(SpecificMovieEffects);
  });

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  describe('Recommeded and similar', () => {
    describe('Fetch Details', () => {
      it('should dispatchs details success action', () => {
        actions$ = of(fetchDetailsStart({ payload: 131 }));
        mockHttp.getMovieDetails.and.returnValue(of(mockMovieDetailsResponse));

        effects.movieDetailsAction$.pipe(take(1)).subscribe((action: any) => {
          expect(mockHttp.getMovieDetails).toHaveBeenCalledTimes(1);
          expect(action).toEqual(
            fetchDetailsSuccess({ payload: mockMovieDetailsResponse })
          );
        });
      });

      it('should dispatch details failure action', () => {
        actions$ = of(fetchDetailsStart({ payload: 131 }));
        mockHttp.getMovieDetails.and.returnValue(
          throwError(() => mockErrorResponse)
        );
        effects.movieDetailsAction$.pipe(take(1)).subscribe((action: any) => {
          expect(mockHttp.getMovieDetails).toHaveBeenCalledTimes(1);
          expect(action).toEqual(
            fetchDetailsFailure({ payload: 'Error Message' })
          );
        });
      });

      it('should upsert when details success ', () => {
        actions$ = of(
          fetchDetailsSuccess({ payload: mockMovieDetailsResponse })
        );
        effects.fetchDetailsSuccess$.pipe(take(1)).subscribe((action: any) => {
          const values = [
            ...mockMovieDetailsResponse.recommendations.results,
            ...mockMovieDetailsResponse.similar.results,
          ];
          expect(action).toEqual(upsertManyMovies({ payload: values }));
        });
      });
    });

    it('should clear movies when details start action', () => {
      actions$ = of(fetchDetailsStart({ payload: 131 }));
      effects.fetchDetailsStart$.pipe(take(1)).subscribe((action: any) => {
        expect(action).toEqual(clearSpecificMovie());
      });
    });

    describe('should upsert similar or recommended success', () => {
      it('should upsert on recommended Success', () => {
        actions$ = of(fetchRecommendedSuccess({ payload: mockMoviesResponse }));
        effects.recommendedOrSimilarSuccess$
          .pipe(take(1))
          .subscribe((action: any) => {
            expect(action).toEqual(
              upsertManyMovies({ payload: mockMoviesResponse.results })
            );
          });
      });

      it('should upsert on similar Success', () => {
        actions$ = of(fetchSimilarSuccess({ payload: mockMoviesResponse }));
        effects.recommendedOrSimilarSuccess$
          .pipe(take(1))
          .subscribe((action: any) => {
            expect(action).toEqual(
              upsertManyMovies({ payload: mockMoviesResponse.results })
            );
          });
      });
    });

    describe('Update when changing favorite', () => {
      it('should update when adding to favorites', () => {
        actions$ = of(addMovieToFavoriteSuccess({ movieId: 21 }));
        effects.favoriteAddSuccess$.pipe(take(1)).subscribe((action: any) => {
          expect(action).toEqual(updateSpecificFavorite({ payload: true }));
        });
      });

      it('should update when removing from favorites', () => {
        actions$ = of(deleteFavoriteSuccess({ movieId: 123 }));
        effects.favoriteDeleteSuccess$
          .pipe(take(1))
          .subscribe((action: any) => {
            expect(action).toEqual(updateSpecificFavorite({ payload: false }));
          });
      });
    });
  });
});
