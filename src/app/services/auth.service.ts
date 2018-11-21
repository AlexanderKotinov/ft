import { Injectable } from '@angular/core';
import { AuthData } from '../models/auth-data.model';
import {BehaviorSubject, Observable} from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from '../components/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged = new BehaviorSubject(false);
  private _user: Observable<firebase.User>;
  private _userDetails: firebase.User = null;

  constructor(private _auth: AngularFireAuth,
              private _router: Router,
              private afs: AngularFirestore,
              private _uiService: UiService,
              private _store: Store<fromRoot.State>) {
    this._user = _auth.authState;
    _auth.authState.subscribe(user => {
      user ? this._userDetails = user : this._userDetails = null;
    });
  }

  registerUser(authData: AuthData): void {
    // this._uiService.loadingStateChanged.next(true);
    this._store.dispatch(new UI.StartLoading());
    this._auth.auth.createUserWithEmailAndPassword(authData.email, authData.email)
      .then(res => {
        // this._uiService.loadingStateChanged.next(false);
        this._store.dispatch(new UI.StopLoading());
        this._user = this._auth.authState;
        this._router.navigate(['/training']);
      })
      .catch(error => {
        // this._uiService.loadingStateChanged.next(false);
        this._store.dispatch(new UI.StopLoading());
        this._uiService.showError(error.message, null, 4000);
      });
  }

  login(authData: AuthData): void {
    // this._uiService.loadingStateChanged.next(true);
    this._store.dispatch(new UI.StartLoading());
    this._auth.auth.signInWithEmailAndPassword(authData.email, authData.email)
      .then(() => {
        // this._uiService.loadingStateChanged.next(false);
        this._store.dispatch(new UI.StopLoading());
        this._user = this._auth.authState;
        this._router.navigate(['/training']);
      })
      .catch(error => {
        this._uiService.showError(error.message, null, 4000);
        // this._uiService.loadingStateChanged.next(false);
        this._store.dispatch(new UI.StopLoading());
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
