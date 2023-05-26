import { NgOptimizedImage } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import {
  addMovieToFavorites,
  deleteFavorite,
} from 'src/app/favorites/store/favorites.actions';
import {
  addToWatchlist,
  removeFromWatchList,
} from '../../store/specific-movie.actions';
import { selectMovieAccountState } from '../../store/specific-movie.selectors';
import { mockMovieDetails } from '../../test/mock-movie-details';
import { MovieDetailsCircleComponent } from '../movie-details-circle/movie-details-circle.component';
import { MovieDetailsRatingComponent } from '../movie-details-rating/movie-details-rating.component';

import { MovieDetailsMovieComponent } from './movie-details-movie.component';

describe('MovieDetailsMovieComponent', () => {
  let component: MovieDetailsMovieComponent;
  let fixture: ComponentFixture<MovieDetailsMovieComponent>;
  let mockStore: MockStore<AppState>;
  let mockAccountStates: {
    id: number;
    rated: { value: number } | boolean;
    watchlist: boolean;
    favorite: boolean;
  };
  let mockDialog: any;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('dialog', ['open']);
    await TestBed.configureTestingModule({
      declarations: [
        MovieDetailsMovieComponent,
        MovieDetailsCircleComponent,
        MovieDetailsRatingComponent,
      ],
      imports: [
        MatIconModule,
        NgOptimizedImage,
        MatTooltipModule,
        MatDialogModule,
      ],
      providers: [
        provideMockStore(),
        {
          provide: MatDialog,
          useValue: mockDialog,
        },
      ],
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MovieDetailsMovieComponent);
    component = fixture.componentInstance;
    component.subscription = of(true).subscribe();
    component.movie = mockMovieDetails;
  });

  afterEach(() => {
    mockStore.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rating', () => {
    it('should get rating false', () => {
      mockAccountStates = {
        id: 505642,
        rated: false,
        watchlist: false,
        favorite: false,
      };
      mockStore.overrideSelector(selectMovieAccountState, mockAccountStates);
      fixture.detectChanges();
      expect(component.isRated).toBeFalse();
      expect(component.rating).toBe(0);
    });

    it('should get rating true', () => {
      mockAccountStates = {
        id: 505642,
        rated: { value: 10 },
        watchlist: false,
        favorite: false,
      };
      mockStore.overrideSelector(selectMovieAccountState, mockAccountStates);
      fixture.detectChanges();
      expect(component.isRated).toBeTrue();
      expect(component.rating).toBe(10);
    });
  });

  describe('Actions after on Init', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
    describe('Watchlist', () => {
      it('should dispatch add to watchlist, watchlist=false', () => {
        spyOn(mockStore, 'dispatch');
        component.isInWatchList = false;
        component.logged$ = of(true);
        component.watchlistClick();
        fixture.detectChanges();
        expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
        expect(mockStore.dispatch).toHaveBeenCalledWith(
          addToWatchlist({ payload: mockMovieDetails.id })
        );
      });

      it('should dispatch add to watchlist, watchlist=true', () => {
        spyOn(mockStore, 'dispatch');
        spyOn(component, 'openConfirmationDialog').and.returnValue(of(true));
        component.isInWatchList = true;
        component.logged$ = of(true);
        component.watchlistClick();
        fixture.detectChanges();
        expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
        expect(mockStore.dispatch).toHaveBeenCalledWith(
          removeFromWatchList({ payload: mockMovieDetails.id })
        );
      });
    });

    describe('Favorite', () => {
      it('should dispatch add to favorit, favorite=false', () => {
        spyOn(mockStore, 'dispatch');
        component.isFavorite = false;
        component.logged$ = of(true);
        component.favoriteClick();
        fixture.detectChanges();
        expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
        expect(mockStore.dispatch).toHaveBeenCalledWith(
          addMovieToFavorites({ movieId: mockMovieDetails.id })
        );
      });

      it('should dispatch add to favorite, favorite=true', () => {
        spyOn(mockStore, 'dispatch');
        spyOn(component, 'openConfirmationDialog').and.returnValue(of(true));
        component.isFavorite = true;
        component.logged$ = of(true);
        component.favoriteClick();
        fixture.detectChanges();
        expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
        expect(mockStore.dispatch).toHaveBeenCalledWith(
          deleteFavorite({ favoriteMovieId: mockMovieDetails.id })
        );
      });
    });

    describe('Rate', () => {
      it('should toggle rate', () => {
        component.ratingOpen = false;
        component.logged$ = of(true);
        component.ratedClick();
        fixture.detectChanges();
        expect(component.ratingOpen).toBeTrue();
        component.ratedClick();
        fixture.detectChanges();
        expect(component.ratingOpen).toBeFalse();
      });
    });
  });
});
