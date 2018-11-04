import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TrainingService} from '../../services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  trainingStarted = false;
  exerciseSubscription: Subscription;

  constructor(private _trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this._trainingService.exerciseChanged.subscribe(exercise => {
      this.trainingStarted = !!exercise;
    });
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
