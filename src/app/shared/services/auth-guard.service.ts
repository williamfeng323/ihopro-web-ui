import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authService: AuthenticationService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.authService.checkRouterAuth({'noAuthTo': '/home', 'anonymousTo': state.url});
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.authService.checkRouterAuth({'noAuthTo': '/home', 'anonymousTo': state.url});
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    return this.authService.checkRouterAuth({'noAuthTo': '/home', 'anonymousTo': url});
  }
}
