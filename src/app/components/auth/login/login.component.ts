import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UiService} from '../../../shared/ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private _authService: AuthService,
              private _uiService: UiService) { }

  ngOnInit() {
    this.loadingSubs = this._uiService.loadingStateChanged.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
    this._loginFormInit();
  }

  onLogin() {
    this._authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  private _loginFormInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }
}
