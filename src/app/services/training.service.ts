import { Injectable } from '@angular/core';
import {Exercise} from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  availableExercises: Exercise[] = [
    {id: 'crunches', name: 'Crunches', calories: 6, duration: 40},
    {id: 'burpees', name: 'Burpees', calories: 3, duration: 60}
  ];

  constructor() { }
}
