import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TrainingService } from '../../../services/training.service';
import { Exercise } from '../../../models/exercise.model';
import { Subscription } from 'rxjs';
import { UiService } from '../../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  createTrainingForm: FormGroup;
  exercises: Exercise[];
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private _trainingService: TrainingService,
              private _uiService: UiService) { }

  ngOnInit() {
    this.loadingSubs = this._uiService.loadingStateChanged.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
    this._createTrainingFormInit();
    this._trainingService.fetchAvailableExercises();
    this._trainingService.exercisesChanged.subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
    });
  }

  onSubmit() {
    this._trainingService.startExercise(this.createTrainingForm.value.trainingType);
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  private _createTrainingFormInit() {
    this.createTrainingForm = new FormGroup({
      trainingType: new FormControl()
    });
  }
}
