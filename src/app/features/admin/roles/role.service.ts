import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Role } from './role.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Injectable()
export class RoleService {
  constructor(
    private http: HttpClient
  ) {}

  getRoles(): Observable<any> {
    return this.http.get('/api/roles').map(
      data => {
        let roles: Role[] = [];
        if (data instanceof Array) {
          for (let role of data) {
            roles.push(new Role(role));
          }
        }
        return Observable.of(roles);
      }
    );
  }
  createOrUpdateRole(role: Role) {
    return this.http.post('/api/roles', role);
  }
  deleteRole(role: Role) {
    return this.http.delete('/api/roles/' + role.id);
  }
}
