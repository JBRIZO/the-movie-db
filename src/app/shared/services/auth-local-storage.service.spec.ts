import { TestBed } from '@angular/core/testing';
import { mockUser } from 'src/app/auth/test/mock-user';

import { AuthLocalStorageService } from './auth-local-storage.service';

describe('AuthLocalStorageService', () => {
  let service: AuthLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AuthLocalStorageService] });
    service = TestBed.inject(AuthLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set element', () => {
    spyOn(localStorage, 'setItem');
    service.setElement('name', 'asdf');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  describe('should get element', () => {
    it('should get element when value', () => {
      const objectValue = { value: 'value' };
      const jsonVal = JSON.stringify(objectValue);
      spyOn(localStorage, 'getItem').and.returnValue(jsonVal);
      const result = service.getElement('requestToken');
      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(result).toEqual(objectValue);
    });

    it('should get element when not value ', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      const result = service.getElement('requestToken');
      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(result).toEqual(null);
    });
  });

  it('should get element', () => {
    spyOn(localStorage, 'getItem');
    service.getElement('requestToken');
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  describe('should get user', () => {
    it('should get current User', () => {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
      const user = AuthLocalStorageService.getCurrentUser();
      expect(user).toEqual(mockUser);
    });

    it('should get current User when doesnt exist', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      const user = AuthLocalStorageService.getCurrentUser();
      expect(user).toEqual(null);
    });
  });
});
