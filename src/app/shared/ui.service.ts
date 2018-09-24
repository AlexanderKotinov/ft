import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private _snackBar: MatSnackBar) { }

  showError(msg, action, duration) {
    this._snackBar.open('Error: ' + msg, action, {
      duration: duration
    });
  }
}
