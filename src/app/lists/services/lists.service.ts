import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IErrorResponse } from 'src/app/auth/interfaces/error.response';
import { Response } from 'src/app/favorites/interfaces/response.interface';
import { environment } from 'src/environments/environment.development';
import { ICreateListResponse } from '../interfaces/create-list-response.interface';
import { IListDetails } from '../interfaces/list-details-response.interface';
import { IListResponse } from '../interfaces/movie-lists-response.interface';

@Injectable()
export class ListsService {
  private readonly url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUserLists(page = 1, userId: number): Observable<IListResponse> {
    return this.http.get<IListResponse>(
      `${this.url}account/${userId}/lists?language=en-US&page=${page}`
    );
  }

  getListDetails(listId: number): Observable<IListDetails> {
    return this.http.get<IListDetails>(`${this.url}list/${listId}`).pipe(
      catchError((error: { error: IErrorResponse }) => {
        return throwError(() => error.error.status_message);
      })
    );
  }

  createList(
    name: string,
    description: string
  ): Observable<ICreateListResponse> {
    return this.http.post<ICreateListResponse>(`${this.url}list`, {
      name: name,
      description: description,
    });
  }

  deleteMovieFromList(
    movieId: number,
    listId: number
  ): Observable<{ movieId: number; listId: number }> {
    return this.http
      .post(`${this.url}list/${listId}/remove_item`, {
        media_id: movieId,
      })
      .pipe(
        map(() => {
          return { movieId: movieId, listId: listId };
        }),
        catchError((error: { error: IErrorResponse }) => {
          return throwError(() => error.error.status_message);
        })
      );
  }

  clearList(listId: number): Observable<number> {
    return this.http
      .post<Response>(`${this.url}list/${listId}/clear?confirm=true`, null)
      .pipe(
        map(() => {
          return listId;
        })
      );
  }

  addMovieToList(movieId: number, listId: number): Observable<number> {
    return this.http
      .post<Response>(`${this.url}list/${listId}/add_item`, {
        media_id: movieId,
      })
      .pipe(
        map(() => {
          return listId;
        })
      );
  }
}
