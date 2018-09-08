import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();

  isAuth: boolean;

  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this._authService.logged.subscribe(response => {
      this.isAuth = response;
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

  ngOnDestroy() {
    this._authService.logged.unsubscribe();
  }
}
