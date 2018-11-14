import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UiService} from '../../../shared/ui.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../app.reducer';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(private _authService: AuthService,
              private _uiService: UiService,
              private _store: Store<{ui: fromApp.State}>) { }

  ngOnInit() {
    this.isLoading$ = this._store.pipe(map(
      state => {
        console.log(state.ui.isLoading);
        return state.ui.isLoading;
      })
    );

    // this.loadingSubs = this._uiService.loadingStateChanged.subscribe((loading: boolean) => {
    //   this.isLoading = loading;
    // });
    this._loginFormInit();
  }

  onLogin() {
    this._authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  // ngOnDestroy() {
  //   if (this.loadingSubs) {
  //     this.loadingSubs.unsubscribe();
  //   }
  // }

  private _loginFormInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }
}
