import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectCurrentUser } from 'src/app/auth/store/auth.selectors';
import { mockUser } from 'src/app/auth/test/mock-user';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { IListDetails } from '../interfaces/list-details-response.interface';
import { IListResponse } from '../interfaces/movie-lists-response.interface';

import { ListsService } from './lists.service';

const mockLists: IListResponse = {
  page: 1,
  results: [
    {
      created_by: 'Test',
      description: 'test',
      favorite_count: 1,
      id: 'string',
      items: [],
      item_count: 1,
      iso_639_1: 'test',
      name: 'test',
      poster_path: null,
      list_type: 'test',
    },
    {
      created_by: 'Test2',
      description: 'test2',
      favorite_count: 2,
      id: 'string',
      items: [],
      item_count: 2,
      iso_639_1: 'test',
      name: 'test',
      poster_path: null,
      list_type: 'test',
    },
  ],
  total_pages: 1,
  total_results: 1,
};

const mockListDetails: IListDetails = {
  created_by: 'Test',
  description: 'test',
  favorite_count: 1,
  id: '1',
  items: [],
  item_count: 1,
  iso_639_1: 'test',
  name: 'test',
  poster_path: null,
  list_type: 'test',
};

describe('ListsService', () => {
  let service: ListsService;
  let httpTestingController: HttpTestingController;
  let store: MockStore;

  const snackBar = jasmine.createSpyObj('SnackBarService', ['open']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore(),
        ListsService,
        { provide: SnackbarService, useValue: snackBar },
      ],
    });
    store = TestBed.inject(MockStore);
    service = TestBed.inject(ListsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve user lists', () => {
    store.overrideSelector(selectCurrentUser, mockUser);
    service.getUserLists(1, mockUser.id).subscribe(lists => {
      expect(lists).toBe(mockLists);
    });

    const request = httpTestingController.expectOne(
      `https://api.themoviedb.org/3/account/${mockUser.id}/lists?language=en-US&page=1`
    );
    expect(request.request.method).toEqual('GET');
    request.flush(mockLists);
  });

  it('should retrieve list details', () => {
    service.getListDetails(+mockListDetails.id!).subscribe(lists => {
      expect(lists).toBe(mockListDetails);
    });

    const request = httpTestingController.expectOne(
      `https://api.themoviedb.org/3/list/${+mockListDetails.id!}`
    );
    expect(request.request.method).toEqual('GET');
    request.flush(mockListDetails);
  });

  it('should create list and return correct list id', () => {
    service
      .createList(mockListDetails.name!, mockListDetails.description!)
      .subscribe(lists => {
        expect(lists.list_id).toBe(+mockListDetails.id!);
      });

    const request = httpTestingController.expectOne(
      `https://api.themoviedb.org/3/list`
    );

    const createListMockResponse = {
      status_message: 'success',
      success: true,
      status_code: 201,
      list_id: +mockListDetails.id!,
    };
    expect(request.request.method).toEqual('POST');
    request.flush(createListMockResponse);
  });

  it('should clear list and return list id', () => {
    service.clearList(+mockListDetails.id!).subscribe(listId => {
      expect(listId).toBe(+mockListDetails.id!);
    });

    const request = httpTestingController.expectOne(
      `https://api.themoviedb.org/3/list/${+mockListDetails.id!}/clear?confirm=true`
    );

    const createListMockResponse = {
      status_message: 'success',
      status_code: 201,
    };
    expect(request.request.method).toEqual('POST');
    request.flush(createListMockResponse);
  });
});
