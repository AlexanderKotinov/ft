import { Injectable } from '@angular/core';
import {Exercise} from '../models/exercise.model';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private _availableExercises: Exercise[] = [];

  private _startedExercise: Exercise;
  exerciseChanged = new Subject();
  exercises: Exercise[] = [];
  exercisesChanged = new Subject<Exercise[]>();

  constructor(private _afs: AngularFirestore) {
  }

  fetchAvailableExercises() {
    this._afs.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data() as Exercise
          };
        });
      })
    ).subscribe((exercises: Exercise[]) => {
      this._availableExercises = exercises;
      this.exercisesChanged.next([...this._availableExercises]);
    });
  }

  startExercise(exerciseId: string) {
    this._startedExercise = this._availableExercises.find(e => e.id === exerciseId);
    this.exerciseChanged.next({...this._startedExercise});
  }

  getRunningExercise() {
    return { ...this._startedExercise };
  }

  completeExercise() {
    this._addDataToDb({ ...this._startedExercise, date: new Date(), state: 'completed'});
    this._startedExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this._addDataToDb({ ...this._startedExercise,
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

  private _addDataToDb(exercise: Exercise) {
    this._afs.collection('finishedExercises').add(exercise);
  }
}
