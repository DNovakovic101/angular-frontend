import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthBluService} from '../../logic/services';

@Injectable()
export class DashboardGuard implements CanActivate {
  constructor(
    private _authBluService: AuthBluService,
    private _router: Router
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._authBluService.isLoggedIn()) {
      this._router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
