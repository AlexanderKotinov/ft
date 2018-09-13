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
  exercises: Exercise[] = [];

  constructor() {
  }

  getAvailableExercises() {
    return this._availableExercises.slice();
  }

  startExercise(exerciseId: string) {
    this._startedExercise = this._availableExercises.find(e => e.id === exerciseId);
    this.exerciseChanged.next({...this._startedExercise});
  }

  getRunningExercise() {
    return { ...this._startedExercise };
  }

  completeExercise() {
    this.exercises.push({ ...this._startedExercise, date: new Date(), state: 'completed'});
    this._startedExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({ ...this._startedExercise,
      duration: this._startedExercise.duration * (progress / 100),
      calories: this._startedExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'});
    this._startedExercise = null;
    this.exerciseChanged.next(null);
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
}
