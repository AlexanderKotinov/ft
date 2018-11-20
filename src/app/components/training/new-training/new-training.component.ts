import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TrainingService } from '../../../services/training.service';
import { Exercise } from '../../../models/exercise.model';
import { Subscription } from 'rxjs';
import { UiService } from '../../../shared/ui.service';
import * as fromRoot from '../../../app.reducer';
import {select, Store} from '@ngrx/store';
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  createTrainingForm: FormGroup;
  exercises: Exercise[];
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(private _trainingService: TrainingService,
              private _uiService: UiService,
              private _store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isLoading$ = this._store.pipe(select(fromRoot.getIsLoading));

    // this.loadingSubs = this._uiService.loadingStateChanged.subscribe((loading: boolean) => {
    //   this.isLoading = loading;
    // });
    this._createTrainingFormInit();
    this._trainingService.fetchAvailableExercises();
    this._trainingService.exercisesChanged.subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
    });
    this.fetchAvailableExercises();
  }

  onSubmit() {
    this._trainingService.startExercise(this.createTrainingForm.value.trainingType);
  }

  fetchAvailableExercises() {
    this._trainingService.fetchAvailableExercises();
  }

  // ngOnDestroy() {
  //   if (this.loadingSubs) {
  //     this.loadingSubs.unsubscribe();
  //   }
  // }

  private _createTrainingFormInit() {
    this.createTrainingForm = new FormGroup({
      trainingType: new FormControl()
    });
  }
}
