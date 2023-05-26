import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By, Title } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppState } from 'src/app/store/app.store';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CircleComponent } from '../../../shared/components/card/components/circle/circle.component';
import { CarrouselComponent } from '../../../shared/components/carrousel/carrousel.component';
import {
  fetchPlayingNowStart,
  fetchPopularStart,
  fetchTopRatedStart,
  fetchUpcomingStart,
} from '../../store/home/home.actions';
import {
  selectHomePlayingNow,
  selectHomePopular,
  selectHomeTopRated,
  selectHomeUpcoming,
} from '../../store/home/home.selectors';
import { HomeDiscoverComponent } from '../home-discover/home-discover.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeMainComponent } from './home-main.component';

describe('HomeMainComponent', () => {
  let component: HomeMainComponent;
  let fixture: ComponentFixture<HomeMainComponent>;
  let store: MockStore<AppState>;
  let el: DebugElement;
  let mockTitleService: Partial<Title>;

  beforeEach(async () => {
    mockTitleService = {
      setTitle: jasmine.createSpy('setTitle'),
    };

    await TestBed.configureTestingModule({
      declarations: [
        HomeMainComponent,
        CardComponent,
        CarrouselComponent,
        CircleComponent,
        HomeDiscoverComponent,
      ],
      imports: [
        NgOptimizedImage,
        MatIconModule,
        InfiniteScrollModule,
        CommonModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        provideMockStore(),
        { provide: Title, use: mockTitleService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeMainComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    el = fixture.debugElement;
  });

  beforeEach(() => {
    component.playingStart = fetchPlayingNowStart;
    component.topRatedStart = fetchTopRatedStart;
    component.upcomingStart = fetchUpcomingStart;
    component.popularStart = fetchPopularStart;
    component.playingMovies = selectHomePlayingNow;
    component.topRatedMovies = selectHomeTopRated;
    component.upcomingMovies = selectHomeUpcoming;
    component.popularMovies = selectHomePopular;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch all actions', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledTimes(4);
  });

  it('should render explore section', () => {
    fixture.detectChanges();
    const explore = el.queryAll(By.css('.home__discover'));
    expect(explore.length).toBe(1);
  });

  it('should render the four carrousels', () => {
    fixture.detectChanges();
    const carrousels = el.queryAll(By.css('.carrousels__container'));
    expect(carrousels[0].nativeNode.childNodes.length).toBe(4);
  });
});
