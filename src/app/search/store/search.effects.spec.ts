import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { SearchEffects } from './search.effects';
import { SearchHttpService } from './../services/search-http.service';
import { searchFailure, searchStart, searchSuccess } from './search.actions';
import { of, take, throwError } from 'rxjs';
import { mockMoviesResponse } from 'src/app/home/test/mock-response';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { mockErrorResponse } from 'src/app/auth/test/mock-error-response';
import { upsertManyMovies } from 'src/app/store/movies/movies.actions';

describe('Search Effects', () => {
  let actions$: Actions;
  let effects: SearchEffects;
  let mockHttp: any;
  let mockSnackbar: any;

  beforeEach(async () => {
    mockHttp = jasmine.createSpyObj('specificHttp', ['getSearch']);
    mockSnackbar = jasmine.createSpyObj('snackBar', ['openSnackBar']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [
        SearchEffects,
        provideMockActions(() => actions$),
        {
          provide: SearchHttpService,
          useValue: mockHttp,
        },
        {
          provide: SnackbarService,
          useValue: mockSnackbar,
        },
      ],
    }).compileComponents();

    effects = TestBed.inject(SearchEffects);
  });

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch search success action', () => {
    const paylod = {
      page: 1,
      query: 'query',
    };
    actions$ = of(searchStart({ payload: paylod }));

    mockHttp.getSearch.and.returnValue(of(mockMoviesResponse));

    effects.searchAction.pipe(take(1)).subscribe((action: any) => {
      expect(mockHttp.getSearch).toHaveBeenCalledTimes(1);
      expect(action).toEqual(searchSuccess({ payload: mockMoviesResponse }));
    });
  });

  it('should dispatch empty action', () => {
    const paylod = {
      page: 1,
      query: 'query',
    };
    actions$ = of(searchStart({ payload: paylod }));
    mockHttp.getSearch.and.returnValue(throwError(() => mockErrorResponse));

    effects.searchAction.pipe(take(1)).subscribe((action: any) => {
      expect(mockHttp.getSearch).toHaveBeenCalledTimes(1);
      expect(mockSnackbar.openSnackBar).toHaveBeenCalledTimes(1);
      expect(action).toEqual(searchFailure());
    });
  });

  it('should upsert store on search success action', () => {
    actions$ = of(searchSuccess({ payload: mockMoviesResponse }));

    effects.searchSuccess.pipe(take(1)).subscribe((action: any) => {
      expect(action).toEqual(
        upsertManyMovies({ payload: mockMoviesResponse.results })
      );
    });
  });
});
