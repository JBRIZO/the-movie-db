import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { mockSessionId } from 'src/app/auth/test/mock-session-id';
import { mockTokenResponse } from 'src/app/auth/test/mock-token-response';
import { mockUser } from 'src/app/auth/test/mock-user';
import { AuthHttpService } from './auth-http.service';
import { RedirectService } from './redirect.service';
import {
  mockErrorResponse,
  mockExpectederror,
} from '../test/mock-error-response';
import { AuthLocalStorageService } from 'src/app/shared/services/auth-local-storage.service';

describe('AuthHttpService', () => {
  let service: AuthHttpService;
  let httpController: HttpTestingController;
  let baseUrl = 'https://api.themoviedb.org/3/';
  let mockStorage: any;
  let mockSnackBar: any;
  let mockRedirect: any;

  beforeEach(() => {
    mockSnackBar = jasmine.createSpyObj('snackBar', ['openSnackBar']);
    mockRedirect = jasmine.createSpyObj('redirect', ['redirectToLogin']);

    mockStorage = jasmine.createSpyObj('localStorageService', [
      'setElement',
      'getElement',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        {
          provide: SnackbarService,
          useValue: mockSnackBar,
        },
        {
          provide: AuthLocalStorageService,
          useValue: mockStorage,
        },
        {
          provide: RedirectService,
          useValue: mockRedirect,
        },
        AuthHttpService,
      ],
    });
    service = TestBed.inject(AuthHttpService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get token', () => {
    const restUrl = 'authentication/token/new';
    const url = baseUrl + restUrl;

    service.getToken().subscribe(response => {
      expect(response).toBe(true);
      expect(mockRedirect.redirectToLogin).toHaveBeenCalledTimes(1);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(url);
    request.flush(mockTokenResponse);
  });

  it('should get sessionId', () => {
    const restUrl = 'authentication/session/new';
    const url = baseUrl + restUrl;

    service.postSessionId('testToken').subscribe(response => {
      expect(response).toBe(mockSessionId);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('POST');
    expect(request.request.url).toEqual(url);
    request.flush(mockSessionId);
  });

  it('should get user Info', () => {
    const restUrl = '/account';
    const sessionUrl = '?session_id=';
    const url = baseUrl + restUrl + sessionUrl + 'session';

    service.getuserInfo('session').subscribe(response => {
      expect(response).toBe(mockUser);
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(url);
    request.flush(mockUser);
  });

  describe('should delete session', () => {
    it('should delete session if sessionId', () => {
      mockStorage.getElement.withArgs('sessionId').and.returnValue('session');
      const restUrl = 'authentication/session';
      const sessionUrl = '?session_id=';
      const url = baseUrl + restUrl + sessionUrl + 'session';

      service.deleteSession().subscribe(response => {
        expect(response).toEqual({ success: true });
      });

      const request = httpController.expectOne(url);
      expect(request.request.method).toEqual('DELETE');
      expect(request.request.url).toEqual(url);
      request.flush({ success: true });
    });

    it('should not call the deleteSession if no session Id', () => {
      mockStorage.getElement.withArgs('sessionId').and.returnValue(null);
      service.deleteSession().subscribe(response => {
        expect(response).toEqual({ success: false });
      });
    });
  });

  describe('Catch Errors', () => {
    it('should catch errors get token', () => {
      const restUrl = 'authentication/token/new';
      const url = baseUrl + restUrl;
      service.getToken().subscribe({
        error: error => {
          expect(mockSnackBar.openSnackBar).toHaveBeenCalledTimes(1);
          expect(error).toBe(mockExpectederror.status_message);
        },
      });

      const request = httpController.expectOne(url);
      expect(request.request.method).toEqual('GET');
      expect(request.request.url).toEqual(url);
      request.flush(mockExpectederror, mockErrorResponse);
    });

    it('should catch error getUserInfo', () => {
      const restUrl = '/account';
      const sessionUrl = '?session_id=';
      const url = baseUrl + restUrl + sessionUrl + 'session';

      service.getuserInfo('session').subscribe({
        next: response => {
          expect(response).toBeUndefined();
        },
        error: error => {
          expect(mockSnackBar.openSnackBar).toHaveBeenCalledTimes(1);
          expect(error).toBe(mockExpectederror.status_message);
        },
      });
      const request = httpController.expectOne(url);
      expect(request.request.method).toEqual('GET');
      expect(request.request.url).toEqual(url);
      request.flush(mockExpectederror, mockErrorResponse);
    });

    it('should catch errors sessionId', () => {
      const restUrl = 'authentication/session/new';
      const url = baseUrl + restUrl;

      service.postSessionId('testToken').subscribe({
        error: error => {
          expect(mockSnackBar.openSnackBar).toHaveBeenCalledTimes(1);
          expect(error).toBe(mockExpectederror.status_message);
        },
      });

      const request = httpController.expectOne(url);
      expect(request.request.method).toEqual('POST');
      expect(request.request.url).toEqual(url);
      request.flush(mockExpectederror, mockErrorResponse);
    });

    it('should catch errors delete session', () => {
      mockStorage.getElement.withArgs('sessionId').and.returnValue('session');
      const restUrl = 'authentication/session';
      const sessionUrl = '?session_id=';
      const url = baseUrl + restUrl + sessionUrl + 'session';

      service.deleteSession().subscribe({
        error: error => {
          expect(mockSnackBar.openSnackBar).toHaveBeenCalledTimes(1);
          expect(error).toBe(mockExpectederror.status_message);
        },
      });

      const request = httpController.expectOne(url);
      expect(request.request.method).toEqual('DELETE');
      expect(request.request.url).toEqual(url);
      request.flush(mockExpectederror, mockErrorResponse);
    });
  });
});
