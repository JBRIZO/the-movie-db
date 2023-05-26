import { Injectable } from '@angular/core';
import { IGetTokenResponse } from '../interfaces/get-token-reponse.interface';

@Injectable()
export class RedirectService {
  private redirectBaseUrl = 'https://www.themoviedb.org/';
  private redirectPath = '?redirect_to=';

  redirectToLogin(response: IGetTokenResponse): void {
    const currentUrl = window.location.origin + '/the-movie-db/authenticate';
    const url =
      this.redirectBaseUrl +
      'authenticate/' +
      response.request_token +
      this.redirectPath +
      encodeURIComponent(currentUrl);
    window.location.href = url;
  }
}
