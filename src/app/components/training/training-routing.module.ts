import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingComponent } from './training.component';
import {NewTrainingComponent} from './new-training/new-training.component';

const routes: Routes = [
  { path: '', component: TrainingComponent },
  { path: 'new-training', component: NewTrainingComponent }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TrainingRoutingModule { }
