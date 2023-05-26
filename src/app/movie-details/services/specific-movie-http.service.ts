import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMoviesReponse } from 'src/app/home/interfaces/movies-response.interface';
import { AuthLocalStorageService } from 'src/app/shared/services/auth-local-storage.service';
import { environment } from 'src/environments/environment.development';
import { IMovieDetailsActionResponse } from '../interfaces/responses/movie-actions/movie-actions.response';
import { IMovieDetailsResponse } from '../interfaces/responses/movie-details/movie-details-response.interface';

@Injectable()
export class SpecificMovieHttpService {
  private readonly baseUrl = `${environment.baseUrl}movie/`;

  constructor(private http: HttpClient) {}

  getMovieDetails(movieId: number): Observable<IMovieDetailsResponse> {
    const queryParams = `append_to_response=similar,recommendations,account_states,reviews`;
    let restUrl = `${movieId}?${queryParams}`;
    const url = this.baseUrl + restUrl;
    return this.http.get<IMovieDetailsResponse>(url);
  }

  getRecommended(
    page: number = 1,
    movieId: number
  ): Observable<IMoviesReponse> {
    const queryParams = `&page=${page}`;
    const restUrl = `${movieId}/recommendations?`;
    const url = this.baseUrl + restUrl + queryParams;
    return this.http.get<IMoviesReponse>(url);
  }

  getSimilar(page: number = 1, movieId: number): Observable<IMoviesReponse> {
    const queryParams = `&page=${page}`;
    const restUrl = `${movieId}/similar?`;
    const url = this.baseUrl + restUrl + queryParams;
    return this.http.get<IMoviesReponse>(url);
  }

  postWatchlist(
    action: boolean,
    movieId: number
  ): Observable<IMovieDetailsActionResponse> {
    const baseUrl = 'https://api.themoviedb.org/3/';
    let currentUser = AuthLocalStorageService.getCurrentUser();
    let restUrl;

    if (currentUser) {
      const userId = currentUser.id;
      restUrl = `account/${userId}/watchlist`;
    }
    const body = {
      media_type: 'movie',
      media_id: movieId,
      watchlist: action,
    };
    const url = baseUrl + restUrl;

    return this.http.post<IMovieDetailsActionResponse>(url, body);
  }

  postRateMovie(
    movieId: number,
    rating: number
  ): Observable<IMovieDetailsActionResponse> {
    const url = `${this.baseUrl}${movieId}/rating`;
    const body = {
      value: rating,
    };
    return this.http.post<IMovieDetailsActionResponse>(url, body);
  }

  deleteRateMovie(movieId: number): Observable<IMovieDetailsActionResponse> {
    const url = `${this.baseUrl}${movieId}/rating`;
    return this.http.delete<IMovieDetailsActionResponse>(url);
  }
}
