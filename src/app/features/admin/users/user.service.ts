import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {User} from './user.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Injectable()
export class UserService {
  constructor(
    private http: HttpClient
  ) {}

  getUsers(): Observable<any> {
    return this.http
      .get('/api/users')
      .map( rsp => {
        let users: User[] = [];
        if (rsp instanceof Array) {
          for (let usr of rsp) {
            users.push(new User(usr));
          }
        }
        return Observable.of(users);
    });
  }

  getUser(id: number | string) {
    return this.http.get('/api/users/' + id).map(
      rsp => {
        if (rsp['roles'] && rsp['roles'].length > 0 ) {
          let roles = [];
          for (let role of rsp['roles']){
            roles.push(role.name);
          }
          rsp['roles'] = roles;
        }
        return new User(rsp);
      }
    );
  }

  updateUser(user: User) {
    return this.http.put('/api/users/' + user.id, user);
  }

  createUser(user: User) {
    return this.http.post('/api/users', user);
  }
}
