import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  createTrainingForm: FormGroup;
  @Output() strainingStarted = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    this._createTrainingFormInit();
  }

  onSubmit() {
    console.log(this.createTrainingForm.value);
    this.strainingStarted.emit();
  }

  private _createTrainingFormInit() {
    this.createTrainingForm = new FormGroup({
      trainingType: new FormControl()
    });
  }
}
