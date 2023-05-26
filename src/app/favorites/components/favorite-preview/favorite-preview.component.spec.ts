import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { IMovie } from 'src/app/shared/interfaces/movie.interface';
import { deleteFavorite } from '../../store/favorites.actions';
import { FavoritePreviewComponent } from './favorite-preview.component';

const mockMovie: IMovie = {
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
};

describe('FavoritePreviewComponent', () => {
  let component: FavoritePreviewComponent;
  let fixture: ComponentFixture<FavoritePreviewComponent>;
  let store: MockStore;
  let loader: HarnessLoader;
  let element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatDialogModule,
        MatIconModule,
        RouterTestingModule,
      ],
      declarations: [FavoritePreviewComponent, MatDialogContent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritePreviewComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    element = fixture.debugElement;
    component.movie = mockMovie;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render favorite details correctly', () => {
    const title = element.query(By.css('.movie__title'));
    expect(title.nativeElement.textContent.trim()).toEqual(mockMovie.title);
    const overview = element.query(By.css('.movie__overview'));
    expect(overview.nativeElement.textContent.trim()).toEqual(
      mockMovie.overview
    );
  });

  it('should dispatch delete favorite action when confirmation is true', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    spyOn(component, 'openConfirmationDialog').and.returnValue(of(true));
    component.removeFromFavorites();
    expect(dispatchSpy).toHaveBeenCalledWith(
      deleteFavorite({ favoriteMovieId: mockMovie.id })
    );
  });

  it('should not dispatch delete favorite when confirmation is false', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    spyOn(component, 'openConfirmationDialog').and.returnValue(of(false));
    component.removeFromFavorites();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});
