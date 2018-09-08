import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  maxDate: Date;
  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 1);
    this._signUpFromInit();
  }

  onSubmit() {
    this._authService.registerUser({
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    });
    this._router.navigate(['/training']);
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
