import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this._signUpFromInit();
  }

  private _signUpFromInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }
}
