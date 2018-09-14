import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Exercise } from '../../../models/exercise.model';
import { TrainingService } from '../../../services/training.service';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns: string[] = ['name', 'date', 'state', 'duration', 'calories'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private _trainingService: TrainingService) { }

  ngOnInit() {
    this.dataSource.data = this._trainingService.getCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onFilterData(eData: string) {
    this.dataSource.filter = eData.trim().toLowerCase();
  }
}
