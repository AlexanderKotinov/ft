import { NgModule } from '@angular/core';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AppRoutingModule,
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
