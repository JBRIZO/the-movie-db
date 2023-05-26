import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { mockMovies } from 'src/app/home/test/mock-results';
import { loadFavorites } from '../../store/favorites.actions';
import {
  selectFavoriteMovies,
  selectIsFavoritesLoaded,
} from '../../store/favorites.selectors';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppState } from 'src/app/store/app.store';
import { MockFavoritesPreviewComponent } from '../../tests/mock-components/favorite-preview-mock.component';
import { FavoritesCarrouselComponent } from './favorites-carrousel.component';

describe('FavoritesCarrouselComponent', () => {
  let component: FavoritesCarrouselComponent;
  let fixture: ComponentFixture<FavoritesCarrouselComponent>;
  let mockStore: MockStore<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FavoritesCarrouselComponent,
        MockFavoritesPreviewComponent,
      ],
      imports: [InfiniteScrollModule],
      providers: [provideMockStore()],
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(FavoritesCarrouselComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    mockStore.resetSelectors();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize favoriteMovies$ and areFavoritesLoaded$ observables', () => {
    const mockMoviesResponse = {
      page: 1,
      results: mockMovies,
      total_pages: 2,
      total_results: 3,
    };
    const mockIsFavoritesLoaded = true;

    mockStore.overrideSelector(selectFavoriteMovies, mockMoviesResponse);
    mockStore.overrideSelector(selectIsFavoritesLoaded, mockIsFavoritesLoaded);

    fixture.detectChanges();

    expect(component.favoriteMovies$).toBeTruthy();
    expect(component.areFavoritesLoaded$).toBeTruthy();

    component.favoriteMovies$.subscribe(movies => {
      expect(movies).toEqual(mockMoviesResponse.results);
    });

    component.areFavoritesLoaded$.subscribe(loaded => {
      expect(loaded).toBe(mockIsFavoritesLoaded);
    });
  });

  it('should dispatch loadFavorites action when onScroll is called and there are more pages', () => {
    component.page = 2;
    component.totalPages = 5;

    spyOn(mockStore, 'dispatch');

    component.onScroll();

    expect(mockStore.dispatch).toHaveBeenCalledWith(loadFavorites({ page: 3 }));
  });

  it('should not dispatch loadFavorites action when onScroll is called and there are no more pages', () => {
    component.page = 5;
    component.totalPages = 5;

    spyOn(mockStore, 'dispatch');

    component.onScroll();

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });
});
