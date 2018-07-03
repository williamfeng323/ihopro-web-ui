import {AfterContentInit, Directive, ElementRef, HostBinding, Injectable, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { User } from '../../features/admin/users/user.model';
import { Router } from '@angular/router';


interface RouteTo {
  anonymousTo: string;
  noAuthTo: string;
}

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login (email: string, password: string): Observable<any> {

    function secondStep (rsp_user, http_client) {
      return http_client.get('/api/users/' + rsp_user['id'])
        .map(
          (response) => {
            if (response['roles'] && response['roles'].length > 0 ) {
              let roles = [];
              for (let role of response['roles']){
                roles.push(role.name);
              }
              response['roles'] = roles;
            }
            let usr = new User(response);
            localStorage.setItem('current_user', JSON.stringify(usr));
          }
        );
    }

    return this.http.post('/login', {email: email, password: password})
      .map( rsp => {
        const rsp_user = rsp['response']['user'];
        if (rsp_user && rsp_user.authentication_token) {
          localStorage.setItem('user_token', JSON.stringify(rsp_user));
        }
        return Observable.of(rsp_user);
      }).mergeMap(response => secondStep(response['value'], this.http));
  }

  logout (): void {
    localStorage.removeItem('current_user');
    localStorage.removeItem('user_token');
  }

  getToken (): string {
    const user_token = JSON.parse(localStorage.getItem('user_token'));
    if (user_token) {
      return user_token['authentication_token'];
    }else {
      return 'None';
    }
  }

  isLoggedin (): boolean {
    return !!localStorage.getItem('user_token');
  }

  getCurrentUser(): User|null {
    let usr = JSON.parse(localStorage.getItem('current_user'));
    if (!usr) {
      return null;
    }else {
      return new User(usr);
    }
  }

  checkRouterAuth(routeTo: RouteTo): boolean {
    if ( this.isLoggedin()) {
      let current_user = this.getCurrentUser();
      let roles = current_user.roles || [];
      if (roles.includes('Admin')) {
        return true;
      }else {
        alert('No Authority to the page');
        this.router.navigate([routeTo.noAuthTo]);
      }
    }else {
      alert('Please login');
      this.router.navigate(['/home', { returnUrl: routeTo.anonymousTo }]);
    }
  }
}


@Directive({
  selector: '[checkPermission]',
})
export class AuthorityCheckDirective implements AfterContentInit {
  @Input() accepted_roles: string;
  current_user: User;

  constructor (private authService: AuthenticationService, private el: ElementRef) {}

  ngAfterContentInit() {
    this.el.nativeElement.style.display = this.checkPermission();
  }
  checkPermission() {
    let accepted_roles;
    if (this.accepted_roles) {
      accepted_roles = this.accepted_roles.split(',');
    }else {
      accepted_roles = [];
    }
    accepted_roles.push('Admin');
    this.current_user = this.authService.getCurrentUser();
    if (!!this.current_user) {
      if (this.current_user.roles.filter( (value) => {
        return !(value in accepted_roles);
      }).length !== 0) {
        return 'inherit';
      }
    }
    return 'none';
  }
}
