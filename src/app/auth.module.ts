import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexModule,
    FlexLayoutModule,
    AngularFireAuthModule
  ],
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  exports: [
    SignupComponent,
    LoginComponent
  ]
})
export class AuthModule { }
