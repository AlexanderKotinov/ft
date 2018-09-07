import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-stop-training-dialog',
  templateUrl: './stop-training-dialog.component.html',
  styleUrls: ['./stop-training-dialog.component.scss']
})
export class StopTrainingDialogComponent implements OnInit {
  progress: any;

  constructor(@Inject(MAT_DIALOG_DATA) private _data: any) { }

  ngOnInit() {
    this.progress = this._data.progress;
  }

}
