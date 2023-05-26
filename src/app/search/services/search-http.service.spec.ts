import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockMoviesResponse } from 'src/app/home/test/mock-response';

import { SearchHttpService } from './search-http.service';

describe('SearchHttpService', () => {
  let service: SearchHttpService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchHttpService],
    });
    service = TestBed.inject(SearchHttpService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getMovieDetails', () => {
    const page = 1;
    const searchQuery = 'query';
    const baseUrl = 'https://api.themoviedb.org/3/search/movie?';
    const queryParams = `page=${page}&include_adult=false&query=${searchQuery}`;
    const url = baseUrl + queryParams;
    service.getSearch(searchQuery, page).subscribe(response => {
      expect(response).toBe(mockMoviesResponse);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(url);
    request.flush(mockMoviesResponse);
  });
});
