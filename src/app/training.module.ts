import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './components/training/training.component';
import { NewTrainingComponent } from './components/training/new-training/new-training.component';
import { CurrentTrainingComponent } from './components/training/current-training/current-training.component';
import { PastTrainingComponent } from './components/training/past-training/past-training.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
  ],
  exports: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
  ]
})
export class TrainingModule { }
