import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class AuthLocalStorageService {
  setElement(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  getElement(elementName: LocalStorageItems) {
    const element = localStorage.getItem(elementName);
    if (element) {
      return JSON.parse(element);
    } else {
      return null;
    }
  }

  static getCurrentUser(): IUser | null {
    const value = localStorage.getItem('currentUser');
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }
}

export type LocalStorageItems = 'expiresAt' | 'sessionId' | 'requestToken';
