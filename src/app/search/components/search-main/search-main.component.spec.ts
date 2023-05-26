import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { AppState } from 'src/app/store/app.store';

import { Store, StoreModule } from '@ngrx/store';
import { clearSearch, searchStart } from '../../store/search.actions';
import { SearchMainComponent } from './search-main.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('SearchMainComponent', () => {
  let component: SearchMainComponent;
  let fixture: ComponentFixture<SearchMainComponent>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockRouter: Partial<Router>;
  let mockStore: Partial<Store<AppState>>;

  beforeEach(async () => {
    mockActivatedRoute = {
      queryParamMap: of<ParamMap>({
        get: (param: string) => (param === 'search' ? 'test' : null),
        getAll: (param: string) => [],
        has: (param: string) => false,
        keys: [],
      }),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockStore = {
      select: jasmine
        .createSpy('select')
        .and.returnValues(
          of({ page: 1, total_pages: 5, total_results: 20 }),
          of(false),
          of([])
        ),
      dispatch: jasmine.createSpy('dispatch'),
    };

    await TestBed.configureTestingModule({
      declarations: [SearchMainComponent],
      imports: [
        StoreModule.forRoot({}),
        ReactiveFormsModule,
        InfiniteScrollModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: Store, useValue: mockStore },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component', () => {
    expect(component.page).toBe(1);
    expect(component.totalPages).toBe(5);
    expect(component.totalResults).toBe(20);
    expect(component.loading$).toBeTruthy();
    expect(component.movies$).toBeTruthy();
    expect(component.searchForm instanceof FormGroup).toBeTrue();
  });

  it('should handle form submission', () => {
    component.searchForm.setValue({ search: 'test' });
    component.handleSubmit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/search'], {
      queryParams: { search: 'test' },
    });
  });

  it('should dispatch searchStart when onScroll is called', () => {
    component.page = 1;
    component.totalPages = 3;
    component.searchQuery = 'test';

    component.onScroll();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      searchStart({ payload: { page: 2, query: 'test' } })
    );
  });

  it('should unsubscribe and dispatch clearSearch on component destruction', () => {
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
    expect(mockStore.dispatch).toHaveBeenCalledWith(clearSearch());
  });
});
