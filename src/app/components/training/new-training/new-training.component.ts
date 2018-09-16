import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TrainingService} from '../../../services/training.service';
import {Exercise} from '../../../models/exercise.model';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  createTrainingForm: FormGroup;
  exercises: any;

  constructor(private _trainingService: TrainingService,
              private _afs: AngularFirestore) { }

  ngOnInit() {
    this._createTrainingFormInit();
    this._afs.collection('availableExercises').valueChanges().subscribe(response => {
      this.exercises = response;
    });
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
