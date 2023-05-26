import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ListsActions } from '../../store/list-actions';

import { MovieComponent } from './movie.component';
import { RouterTestingModule } from '@angular/router/testing';

const mockMovie = {
  adult: false,
  backdrop_path: 'teest',
  genre_ids: [],
  id: 1,
  media_type: 'test',
  original_language: 'test',
  original_title: 'test',
  overview: 'test',
  popularity: 4,
  poster_path: 'test',
  release_date: 'test',
  title: 'test',
  video: false,
  vote_average: 4,
  vote_count: 5,
};

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let store: MockStore;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        MatIconModule,
        RouterTestingModule,
        MatDialogModule,
      ],
      declarations: [MovieComponent, MatDialogContent],
      providers: [provideMockStore({})],
    }).compileComponents();
    fixture = TestBed.createComponent(MovieComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.movie = mockMovie;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should open dialog', async () => {
  //   component.openConfirmationDialog();
  //   let dialog = await loader.getHarness(MatDialogHarness);
  //   expect(dialog).toBeTruthy();
  // });

  it('should dispatch delete movie from list action when confirmation is true', () => {
    component.listId = '1';
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    spyOn(component, 'openConfirmationDialog').and.returnValue(of(true));
    component.deleteMovie();
    expect(dispatchSpy).toHaveBeenCalledOnceWith(
      ListsActions.deleteMovieFromList({
        movieId: mockMovie.id,
        listId: +component.listId,
      })
    );
  });

  it('should not dispatch delete movie from list action when confirmation is false', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    spyOn(component, 'openConfirmationDialog').and.returnValue(of(false));
    component.deleteMovie();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});
