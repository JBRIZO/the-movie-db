import { NgOptimizedImage } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BehaviorSubject } from 'rxjs';
import { CarrouselComponent } from 'src/app/shared/components/carrousel/carrousel.component';
import { AppState } from 'src/app/store/app.store';
import {
  selectAreMovieReviews,
  selectAreRecommendedMovies,
  selectMovieDetails,
  selectMovieDetailsLoading,
} from '../../store/specific-movie.selectors';
import { mockMovieDetails } from '../../test/mock-movie-details';
import { MovieDetailsCircleComponent } from '../movie-details-circle/movie-details-circle.component';
import { MovieDetailsMovieComponent } from '../movie-details-movie/movie-details-movie.component';
import { MovieDetailsReviewsComponent } from '../movie-details-reviews/movie-details-reviews.component';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MovieDetailsMainComponent } from './movie-details-main.component';

describe('MovieDetailsMainComponent', () => {
  let component: MovieDetailsMainComponent;
  let fixture: ComponentFixture<MovieDetailsMainComponent>;
  let mockStore: MockStore<AppState>;
  let el: DebugElement;
  let paramValue = { id: 235 };
  let queryParam = new BehaviorSubject<ParamMap>(convertToParamMap(paramValue));
  let mockDialog: any;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('dialog', ['open']);
    await TestBed.configureTestingModule({
      declarations: [
        MovieDetailsMainComponent,
        CarrouselComponent,
        MovieDetailsMovieComponent,
        MovieDetailsReviewsComponent,
        MovieDetailsCircleComponent,
      ],
      imports: [
        InfiniteScrollModule,
        MatIconModule,
        NgOptimizedImage,
        MatDialogModule,
        MatTooltipModule,
      ],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: queryParam,
          },
        },
        {
          provide: MatDialog,
          useValue: mockDialog,
        },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    mockStore.resetSelectors();
  });

  describe('Page query parms has id', () => {
    beforeEach(async () => {
      fixture = TestBed.createComponent(MovieDetailsMainComponent);
      mockStore = TestBed.inject(MockStore);
      queryParam.next(convertToParamMap(paramValue));
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should dispatch action when movie ID', () => {
      spyOn(mockStore, 'dispatch');
      fixture.detectChanges();
      mockStore.overrideSelector(selectAreMovieReviews, true);
      mockStore.overrideSelector(selectAreRecommendedMovies, true);
      mockStore.overrideSelector(selectMovieDetailsLoading, false);
      mockStore.overrideSelector(selectMovieDetails, mockMovieDetails);
      expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Page query parms no id', () => {
    beforeEach(async () => {
      fixture = TestBed.createComponent(MovieDetailsMainComponent);
      mockStore = TestBed.inject(MockStore);
      queryParam.next(convertToParamMap({}));
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should dispatch action when movie ID', () => {
      spyOn(mockStore, 'dispatch');
      fixture.detectChanges();
      mockStore.overrideSelector(selectAreMovieReviews, true);
      mockStore.overrideSelector(selectAreRecommendedMovies, true);
      mockStore.overrideSelector(selectMovieDetailsLoading, false);
      mockStore.overrideSelector(selectMovieDetails, mockMovieDetails);
      expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
    });
  });
});
