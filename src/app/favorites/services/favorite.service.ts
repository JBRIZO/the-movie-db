import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IFavoriteMoviesResponse } from '../interfaces/favorite-list-response.interface';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class FavoriteService {
  private readonly url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUserFavorites(
    page = 1,
    userId: number
  ): Observable<IFavoriteMoviesResponse> {
    return this.http.get<IFavoriteMoviesResponse>(
      `${this.url}account/${userId}/favorite/movies?page=${page}`
    );
  }

  markFavorite(
    movieId: number,
    favorite: boolean,
    userId: number
  ): Observable<number> {
    return this.http
      .post<Response>(`${this.url}account/${userId}/favorite`, {
        media_type: 'movie',
        media_id: movieId,
        favorite: favorite,
      })
      .pipe(
        map(() => {
          return movieId;
        })
      );
  }
}
