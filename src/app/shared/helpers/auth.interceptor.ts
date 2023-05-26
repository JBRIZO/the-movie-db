import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthLocalStorageService } from '../services/auth-local-storage.service';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly apiKey = environment.apiKey;
  constructor(private localStorage: AuthLocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      params: request.params
        .append('session_id', this.localStorage.getElement('sessionId'))
        .append('api_key', this.apiKey),
    });
    return next.handle(request);
  }
}
