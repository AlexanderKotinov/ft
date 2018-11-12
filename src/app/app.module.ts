import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { StopTrainingDialogComponent } from './components/training/current-training/stop-training-dialog/stop-training-dialog.component';
import { environment } from '../environments/environment';
import { AuthModule } from './auth.module';
import {SharedModule} from './shared/shared.module';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthRoutingModule} from './auth-routing.module';
import { appReducer } from './app.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'ftracker'),
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    SharedModule,
    AuthModule,
    AuthRoutingModule,
    StoreModule.forRoot({ui: appReducer})
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    StopTrainingDialogComponent
  ]
})
export class AppModule { }
