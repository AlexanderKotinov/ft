import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UiService} from '../../../shared/ui.service';
import * as fromRoot from '../../../app.reducer';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  maxDate: Date;
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(private _authService: AuthService,
              private _router: Router,
              private _uiService: UiService,
              private _store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isLoading$ = this._store.pipe(select(fromRoot.getIsLoading));
    // this.loadingSubs = this._uiService.loadingStateChanged.subscribe((loading: boolean) => {
    //   this.isLoading = loading;
    // });
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

  // ngOnDestroy() {
  //   if (this.loadingSubs) {
  //     this.loadingSubs.unsubscribe();
  //   }
  // }

  private _signUpFromInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      birthday: new FormControl(null, Validators.required),
      agree: new FormControl(null, Validators.required)
    });
  }
}
