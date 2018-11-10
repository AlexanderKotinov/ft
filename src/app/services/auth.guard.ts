import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService,
              private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    if (this._authService.isAuth()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  // canLoad(route: Route) {
  //   if (this._authService.isAuth()) {
  //     return true;
  //   } else {
  //     this._router.navigate(['/login']);
  //     return false;
  //   }
  // }
}
