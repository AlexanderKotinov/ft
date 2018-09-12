import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {StopTrainingDialogComponent} from './stop-training-dialog/stop-training-dialog.component';
import {TrainingService} from '../../../services/training.service';
import {Exercise} from '../../../models/exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;
  startedExercise: Exercise;

  @Output() trainingExit = new EventEmitter();

  constructor(private _dialog: MatDialog,
              private _trainingService: TrainingService) { }

  ngOnInit() {
    this.startTraining();
  }

  startTraining() {
    this.startedExercise = this._trainingService.getRunningExercise();
    const step = this.startedExercise.duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this._trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  stopTraining() {
    clearInterval(this.timer);
    const dialogRef = this._dialog.open(StopTrainingDialogComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._trainingService.cancelExercise(this.progress);
      } else {
        this.startTraining();
      }
    });
  }
}
