import { Injectable } from '@angular/core';
import { AuthData } from '../models/auth-data.model';
import {BehaviorSubject, Observable} from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged = new BehaviorSubject(false);
  private _user: Observable<firebase.User>;
  private _userDetails: firebase.User = null;

  constructor(private _auth: AngularFireAuth,
              private _router: Router,
              private afs: AngularFirestore) {
    this._user = _auth.authState;
    _auth.authState.subscribe(user => {
      user ? this._userDetails = user : this._userDetails = null;
    });
  }

  registerUser(authData: AuthData): void {
    this._auth.auth.createUserWithEmailAndPassword(authData.email, authData.email)
      .then(res => {
        this._user = this._auth.authState;
        this._router.navigate(['/training']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  login(authData: AuthData): void {
    this._auth.auth.signInWithEmailAndPassword(authData.email, authData.email)
      .then(res => {
        this._user = this._auth.authState;
        this._router.navigate(['/training']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout(): void {
    this.afs.firestore.disableNetwork();
    this.logged.next(false);
    this._auth.auth.signOut().then(() => {
      this._router.navigate(['/']);
    });
  }

  isAuth(): boolean {
    this.logged.next(this._userDetails !== null);
    return this._userDetails !== null;
  }
}
