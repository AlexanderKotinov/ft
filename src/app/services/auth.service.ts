import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AuthData } from '../models/auth-data.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: User;
  logged = new BehaviorSubject(false);

  constructor() { }

  registerUser(authData: AuthData): void {
    this._user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.logged.next(true);
  }

  login(authData: AuthData): void {
    this._user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.logged.next(true);
  }

  logout(): void {
    this._user = null;
    this.logged.next(false);
  }

  getUser(): User {
    return { ...this._user };
  }

  isAuth(): boolean {
    return this._user !== null;
  }
}
