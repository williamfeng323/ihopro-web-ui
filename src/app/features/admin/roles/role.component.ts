import {Component, OnInit} from '@angular/core';
import { RoleService } from './role.service';
import { Role } from './role.model';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlert } from '../../../shared/utils';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Component({
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  roles: Observable<Role[]>;
  role_list: Role[];
  // roleFormArray: Array<FormGroup>;
  // rolesForm: FormArray;
  message: IAlert;

  constructor(
    private roleService: RoleService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {  }

  ngOnInit() {
    this.roleService.getRoles().map(
      (roles: Observable<Role[]>) => {
        this.roles = roles;
        return roles['value'];
      }
    ).mergeMap(
      (roles: Role[]) => {
        this.role_list = roles;
        return Observable.of('success');
      }
    ).subscribe(
      data => {},
      error => {
        this.message = {
          type: 'warning',
          message: 'Failed to retrieve role list'
        };
      }
    );
  }
  editRole(target) {
    for (let input_field of target.parentElement.getElementsByTagName('input')) {
      input_field.disabled = !input_field.disabled;
    }
  }
  addRole() {
    this.role_list.push(new Role());
  }
  closeAlert() {
    this.message = null;
  }
  submit(role: Role, target) {
    this.roleService.createOrUpdateRole(role).subscribe(
      (data: Role) => {
        this.message = {
          type: 'success',
          message: 'Update Successfully'
        };
        this.role_list.forEach(
          (current_role, ind) => {
            if (current_role.name === data.name) {
              this.roles[ind] = data;
            }
          }
        );
      },
      error => {
        console.log(error);
        this.message = {
          type: 'warning',
          message: 'Update Failed'
        };
      },
      () => {
        for (let input_field of target.parentElement.parentElement.getElementsByTagName('input')){
          input_field.disabled = true;
        }
      }
    );
  }
  delete(role: Role) {
    if (!role.name || !role.description ) {
      this.role_list = this.role_list.filter(
        current_role => {
          return !!current_role.name;
        }
      );
      return null;
    }
    this.roleService.deleteRole(role).subscribe(
      (data) => {
        this.message = {
          type: 'success',
          message: data['msg']
        };
      },
      (error: HttpErrorResponse) => {
        this.message = {
          type: 'warning',
          message: error.message
        };
      },
      () => {
        this.role_list = (this.role_list.filter(
          current_role => {
            return current_role.name !== role.name;
          }
          ));
      }
    );
  }
}
