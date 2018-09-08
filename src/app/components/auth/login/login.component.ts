import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this._loginFormInit();
  }

  onLogin() {
    this._authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
    this._router.navigate(['/training']);
  }

  private _loginFormInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }
}
