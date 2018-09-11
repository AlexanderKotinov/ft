import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TrainingService} from '../../../services/training.service';
import {Exercise} from '../../../models/exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  createTrainingForm: FormGroup;
  exercises: Exercise[];

  constructor(private _trainingService: TrainingService) { }

  ngOnInit() {
    this._createTrainingFormInit();
    this.exercises = this._trainingService.getAvailableExercises();
  }

  onSubmit() {
    this._trainingService.startExercise(this.createTrainingForm.value.trainingType);
  }

  private _createTrainingFormInit() {
    this.createTrainingForm = new FormGroup({
      trainingType: new FormControl()
    });
  }
}
