import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TrainingComponent } from './components/training/training.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: TrainingComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class TrainingRoutingModule { }
