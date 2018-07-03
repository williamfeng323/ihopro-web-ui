import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './services/authentication.service';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private inj: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = baseConfig.baseUrl;
    const auth = this.inj.get(AuthenticationService);
    const authHeader = {'GTA-Auth-Token': auth.getToken()};
    req = req.clone({
      url: url + req.url,
      setHeaders: authHeader
    });
    return next.handle(req);
  }
}

export const baseConfig = {
  baseUrl: environment.apiUrl
};
