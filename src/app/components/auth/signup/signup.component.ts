import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UiService} from '../../../shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  maxDate: Date;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private _authService: AuthService,
              private _router: Router,
              private _uiService: UiService) { }

  ngOnInit() {
    this.loadingSubs = this._uiService.loadingStateChanged.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 1);
    this._signUpFromInit();
  }

  onSubmit() {
    this._authService.registerUser({
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  private _signUpFromInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      birthday: new FormControl(null, Validators.required),
      agree: new FormControl(null, Validators.required)
    });
  }
}
