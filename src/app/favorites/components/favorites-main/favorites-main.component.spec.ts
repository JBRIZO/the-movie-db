import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectCurrentUser } from 'src/app/auth/store/auth.selectors';
import { loadLists } from 'src/app/lists/store/lists.actions';
import { IMovie } from 'src/app/shared/interfaces/movie.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { MockProfileComponent } from 'src/app/shared/test/mock-components/mock-profile.components';
import { loadFavorites } from '../../store/favorites.actions';
import { MockFavoritesCarrouselComponent } from '../../tests/mock-components/favorite-carousel-mock.component';
import { MockFavoritesPreviewComponent } from '../../tests/mock-components/favorite-preview-mock.component';
import { FavoritesMainComponent } from './favorites-main.component';

const userMock: IUser = {
  avatar: {
    gravatar: {
      hash: 'asdasd',
    },
  },
  id: 1,
  iso_639_1: 'test',
  iso_3166_1: 'test',
  name: 'test name',
  include_adult: false,
  username: 'username',
};

const mockMovieList: IMovie[] = [
  {
    poster_path: 'test',
    adult: false,
    overview: 'test',
    release_date: '09-11-2022',
    genre_ids: [1, 2, 3],
    id: 1,
    original_title: 'test',
    original_language: 'test',
    title: 'test',
    backdrop_path: 'test',
    popularity: 100,
    vote_count: 10,
    video: false,
    vote_average: 8,
  },
  {
    poster_path: 'test 2',
    adult: false,
    overview: 'test 2',
    release_date: '09-11-2022',
    genre_ids: [1, 2, 3],
    id: 2,
    original_title: 'test',
    original_language: 'test',
    title: 'test',
    backdrop_path: 'test',
    popularity: 100,
    vote_count: 10,
    video: false,
    vote_average: 9,
  },
];

describe('FavoritesMainComponent', () => {
  let component: FavoritesMainComponent;
  let fixture: ComponentFixture<FavoritesMainComponent>;
  let element: DebugElement;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [
        FavoritesMainComponent,
        MockFavoritesPreviewComponent,
        MockProfileComponent,
        MockFavoritesCarrouselComponent,
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectCurrentUser,
              value: userMock,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesMainComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch actions to load favorites and lists', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith(loadFavorites({ page: 1 }));
    expect(dispatchSpy).toHaveBeenCalledWith(loadLists({ page: 1 }));
  });
});
