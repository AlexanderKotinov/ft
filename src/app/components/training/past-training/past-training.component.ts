import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Exercise } from '../../../models/exercise.model';
import { TrainingService } from '../../../services/training.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns: string[] = ['name', 'date', 'state', 'duration', 'calories'];
  private _exercisesChangedSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _trainingService: TrainingService) { }

  ngOnInit() {
    this._exercisesChangedSubscription = this._trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
    this._trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onFilterData(eData: string) {
    this.dataSource.filter = eData.trim().toLowerCase();
  }

  ngOnDestroy() {
    this._exercisesChangedSubscription.unsubscribe();
  }
}
