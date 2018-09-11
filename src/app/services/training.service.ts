import { Injectable } from '@angular/core';
import {Exercise} from '../models/exercise.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private _availableExercises: Exercise[] = [
    {id: 'crunches', name: 'Crunches', calories: 6, duration: 40},
    {id: 'burpees', name: 'Burpees', calories: 3, duration: 60}
  ];

  private _startedExercise: Exercise;
  exerciseChanged = new Subject();

  constructor() {
  }

  getAvailableExercises() {
    return this._availableExercises.slice();
  }

  startExercise(exerciseId: string) {
    this._startedExercise = this._availableExercises.find(e => e.id === exerciseId);
    this.exerciseChanged.next({...this._startedExercise});
  }
}
