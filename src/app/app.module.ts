import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { StopTrainingDialogComponent } from './components/training/current-training/stop-training-dialog/stop-training-dialog.component';
import { environment } from '../environments/environment';
import { AuthModule } from './auth.module';
import { TrainingModule } from './training.module';

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
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AuthModule,
    AngularFireModule.initializeApp(environment.firebase, 'ftracker'),
    AngularFirestoreModule,
    TrainingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    StopTrainingDialogComponent
  ]
})
export class AppModule { }
