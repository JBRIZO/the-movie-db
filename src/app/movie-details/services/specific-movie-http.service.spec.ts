import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockUser } from 'src/app/auth/test/mock-user';
import { mockMoviesResponse } from 'src/app/home/test/mock-response';
import { mockMovieDetailsResponse } from '../test/mock-movie-details.response';
import { SpecificMovieHttpService } from './specific-movie-http.service';
import { AuthLocalStorageService } from 'src/app/shared/services/auth-local-storage.service';

describe('SpecificMovieHttpService', () => {
  let service: SpecificMovieHttpService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpecificMovieHttpService],
    });
    service = TestBed.inject(SpecificMovieHttpService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getMovieDetails', () => {
    const movieId = 1234;
    const baseUrl = 'https://api.themoviedb.org/3/movie/';
    const queryParams = `append_to_response=similar,recommendations,account_states,reviews`;
    let restUrl = `${movieId}?${queryParams}`;
    const url = baseUrl + restUrl;

    service.getMovieDetails(1234).subscribe(response => {
      expect(response).toBe(mockMovieDetailsResponse);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(url);
    request.flush(mockMovieDetailsResponse);
  });

  it('should getRecommended', () => {
    const movieId = 1234;
    const baseUrl = 'https://api.themoviedb.org/3/movie/';
    const queryParams = `&page=${1}`;
    const restUrl = `${movieId}/recommendations?`;
    const url = baseUrl + restUrl + queryParams;

    service.getRecommended(1, 1234).subscribe(response => {
      expect(response).toBe(mockMoviesResponse);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(url);
    request.flush(mockMoviesResponse);
  });

  it('should get Similar', () => {
    const movieId = 1234;
    const baseUrl = 'https://api.themoviedb.org/3/movie/';
    const queryParams = `&page=${1}`;
    const restUrl = `${movieId}/similar?`;
    const url = baseUrl + restUrl + queryParams;

    service.getSimilar(1, 1234).subscribe(response => {
      expect(response).toBe(mockMoviesResponse);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(url);
    request.flush(mockMoviesResponse);
  });

  it('should postWatchlist', () => {
    spyOn(AuthLocalStorageService, 'getCurrentUser').and.returnValue(mockUser);
    const userId = mockUser.id;
    const baseUrl = 'https://api.themoviedb.org/3/';
    const restUrl = `account/${userId}/watchlist`;
    const url = baseUrl + restUrl;
    const mockBody = {
      media_type: 'movie',
      media_id: 1234,
      watchlist: true,
    };
    const mockResponse = {
      status_code: 3,
      status_message: 'message',
    };

    service.postWatchlist(true, 1234).subscribe(response => {
      expect(response).toBe(mockResponse);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(mockBody);
    expect(request.request.url).toEqual(url);
    request.flush(mockResponse);
  });

  it('should post rate movie', () => {
    const movieId = 1234;
    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating`;
    const mockRating = 10;
    const mockBody = {
      value: mockRating,
    };
    const mockResponse = {
      status_code: 3,
      status_message: 'message',
    };

    service.postRateMovie(1234, mockRating).subscribe(response => {
      expect(response).toBe(mockResponse);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(mockBody);
    expect(request.request.url).toEqual(url);
    request.flush(mockResponse);
  });

  it('should delete rate movie', () => {
    const movieId = 1234;
    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating`;

    const mockResponse = {
      status_code: 3,
      status_message: 'message',
    };

    service.deleteRateMovie(1234).subscribe(response => {
      expect(response).toBe(mockResponse);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('DELETE');
    expect(request.request.url).toEqual(url);
    request.flush(mockResponse);
  });
});
