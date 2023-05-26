import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockMoviesListComponent } from '../../test/mock-components/mock-movies-list.component';

import { MockProfileComponent } from 'src/app/shared/test/mock-components/mock-profile.components';
import { loadLists } from '../../store/lists.actions';
import { ListsMainComponent } from './lists-main.component';

describe('ListsMainComponent', () => {
  let component: ListsMainComponent;
  let fixture: ComponentFixture<ListsMainComponent>;
  let mockStore: MockStore;
  let mockTitleService: Partial<Title>;

  beforeEach(() => {
    mockTitleService = {
      setTitle: jasmine.createSpy('setTitle'),
    };

    TestBed.configureTestingModule({
      declarations: [
        ListsMainComponent,
        MockProfileComponent,
        MockMoviesListComponent,
      ],
      providers: [
        provideMockStore(),
        { provide: Title, useValue: mockTitleService },
      ],
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ListsMainComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the page title', () => {
    fixture.detectChanges();

    expect(mockTitleService.setTitle).toHaveBeenCalledWith('My lists');
  });

  it('should dispatch the loadLists action', () => {
    spyOn(mockStore, 'dispatch');

    fixture.detectChanges();

    expect(mockStore.dispatch).toHaveBeenCalledWith(loadLists({ page: 1 }));
  });
});
