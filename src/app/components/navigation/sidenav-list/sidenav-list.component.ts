import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  isAuth: boolean;

  @Output() closeSidenav = new EventEmitter<void>();

  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this._authService.logged.subscribe(response => {
      this.isAuth = response;
    });
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
