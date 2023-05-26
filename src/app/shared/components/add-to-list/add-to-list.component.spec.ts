import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { IListDetails } from 'src/app/lists/interfaces/list-details-response.interface';
import { ListsActions } from 'src/app/lists/store/list-actions';
import { selectListEntities } from 'src/app/lists/store/lists.selector';

import { AddToListComponent } from './add-to-list.component';

const mockLists: IListDetails[] = [
  {
    created_by: 'test',
    description: 'test1',
    favorite_count: 1,
    id: 'string',
    items: [
      {
        adult: false,
        backdrop_path: '/y5Z0WesTjvn59jP6yo459eUsbli.jpg',
        genre_ids: [27, 53],
        id: 2,
        original_language: 'en',
        original_title: 'Terrifier 2',
        overview:
          "After being resurrected by a sinister entity, Art the Clown returns to Miles County where he must hunt down and destroy a teenage girl and her younger brother on Halloween night.  As the body count rises, the siblings fight to stay alive while uncovering the true nature of Art's evil intent.",
        popularity: 3803.184,
        poster_path: '/b6IRp6Pl2Fsq37r9jFhGoLtaqHm.jpg',
        release_date: '2022-10-06',
        title: 'Terrifier 2',
        video: false,
        vote_average: 7,
        vote_count: 563,
        media_type: 'movie',
      },
    ],
    item_count: 1,
    iso_639_1: 'es',
    name: 'test name',
    poster_path: 'string',
    list_type: 'movie',
  },
  {
    created_by: 'test',
    description: 'test1',
    favorite_count: 1,
    id: 'string',
    items: [],
    item_count: 1,
    iso_639_1: 'es',
    name: 'test name',
    poster_path: 'string',
    list_type: 'movie',
  },
];

describe('AddToListComponent', () => {
  let component: AddToListComponent;
  let fixture: ComponentFixture<AddToListComponent>;
  let store: MockStore;
  let element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        RouterTestingModule,
        MatDialogModule,
        NoopAnimationsModule,
      ],
      declarations: [AddToListComponent],
      providers: [provideMockStore({})],
    }).compileComponents();
    fixture = TestBed.createComponent(AddToListComponent);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectListEntities, mockLists);
    element = fixture.debugElement;
    component = fixture.componentInstance;
    component.movieId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch deleteMovieFromList action on confirmation', () => {
    spyOn(component, 'openConfirmationDialog').and.returnValue(of(true));
    const listId = '1';
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.removeMovieFromList(listId);
    expect(dispatchSpy).toHaveBeenCalledWith(
      ListsActions.deleteMovieFromList({
        movieId: component.movieId,
        listId: parseInt(listId),
      })
    );
  });

  it('should dispatch addMovieToList action on add', () => {
    const listId = '1';
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.addMovieToList(listId);
    expect(dispatchSpy).toHaveBeenCalledWith(
      ListsActions.addMovieToList({
        movieId: component.movieId,
        listId: parseInt(listId),
      })
    );
  });

  it('should render the correct number of lists', () => {
    const listItems = element.queryAll(By.css('.list__item'));
    expect(listItems.length).toEqual(mockLists.length);
  });

  it('should render no lists text when there is no lists', () => {
    store.overrideSelector(selectListEntities, []);
    component.ngOnInit();
    fixture.detectChanges();
    const noListsMessage = element.query(By.css('.no__lists'));
    expect(noListsMessage).toBeTruthy();
  });

  it('should check if a movie exists in a list', () => {
    component.movieId = 1;
    expect(component.isMovieInList(mockLists[0]))
      .withContext("Movie doesn't exist")
      .toBeFalse();
    component.movieId = mockLists[0].items[0].id;
    expect(component.isMovieInList(mockLists[0]))
      .withContext('Movie exists')
      .toBeTrue();
  });
});
