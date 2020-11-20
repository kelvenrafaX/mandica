import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../providers/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private login: LoginService, private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return true;
    /*if (this.login.usuarioEstaAutenticado()) {

      return true;
    }

    this.router.navigate(['/login']);

    return false;*/

  }
}



