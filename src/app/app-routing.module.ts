import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import {LoginComponent} from './components/auth/login/login.component';
import {TrainingComponent} from './components/training/training.component';
import {CurrentTrainingComponent} from './components/training/current-training/current-training.component';
import {NewTrainingComponent} from './components/training/new-training/new-training.component';
import {PastTrainingComponent} from './components/training/past-training/past-training.component';
import {AuthGuard} from './services/auth.guard';
import {AuthRoutingModule} from "./auth-routing.module";
import {TrainingRoutingModule} from "./training-routing.module";

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'training', loadChildren: './training.module#TrainingModule' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AuthRoutingModule,
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
