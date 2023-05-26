import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMoviesReponse } from 'src/app/home/interfaces/movies-response.interface';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class SearchHttpService {
  constructor(private http: HttpClient) {}
  private baseUrl = `${environment.baseUrl}search/movie?`;

  getSearch(searchQuery: string, page: number): Observable<IMoviesReponse> {
    const queryParams = `page=${page}&include_adult=false&query=${searchQuery}`;
    const url = this.baseUrl + queryParams;
    return this.http.get<IMoviesReponse>(url);
  }
}
