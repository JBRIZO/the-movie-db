import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IMovieList } from '../../interfaces/movie-list-response.interface';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import { IListResponse } from '../../interfaces/movie-lists-response.interface';
import { loadLists } from '../../store/lists.actions';
import { selectLists } from '../../store/lists.selector';
import { MovieslistsComponent } from './movieslists.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const mockMoviesList: IListResponse = {
  total_pages: 1,
  page: 1,
  total_results: 2,
  results: [
    {
      created_by: 'creator',
      description: 'test',
      favorite_count: 1,
      id: '1',
      item_count: 1,
      iso_639_1: 'test',
      list_type: 'test',
      name: 'test',
      poster_path: 'path',
      items: [],
    },
    {
      created_by: 'creator2',
      description: 'test',
      favorite_count: 1,
      id: '2',
      item_count: 1,
      iso_639_1: 'test',
      list_type: 'test',
      name: 'test',
      poster_path: 'path',
      items: [],
    },
  ],
};

@Component({
  selector: 'app-list-preview',
  template: '<div> Mock </div>',
})
class MockComponent {
  @Input() list!: IMovieList;
}

describe('MovieslistsComponent', () => {
  let component: MovieslistsComponent;
  let fixture: ComponentFixture<MovieslistsComponent>;
  let mockStore: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfiniteScrollModule],
      declarations: [MovieslistsComponent, MockComponent],
      providers: [provideMockStore()],
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MovieslistsComponent);
    component = fixture.componentInstance;

    mockStore.overrideSelector(selectLists, mockMoviesList);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select user lists and set page and totalPages variables', () => {
    expect(component.page).toBe(mockMoviesList.page);
    expect(component.totalPages).toBe(mockMoviesList.total_pages);
    expect(component.userLists$).toBeDefined();
  });

  it('should dispatch the loadLists action onScroll', () => {
    component.page = 1;
    component.totalPages = 2;

    spyOn(mockStore, 'dispatch');

    component.onScroll();

    expect(mockStore.dispatch).toHaveBeenCalledWith(loadLists({ page: 2 }));
  });
});
