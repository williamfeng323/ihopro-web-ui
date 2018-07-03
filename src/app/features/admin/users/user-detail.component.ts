import {Component, OnInit} from '@angular/core';
import { UserService } from './user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from './user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { RoleService } from '../roles/role.service';
import { CustomValidators } from '../../../shared/CustomValidators';
import { DialogService } from '../../../shared/services/dialog.service';
import { Observable } from 'rxjs/Rx';
import { HttpErrorResponse } from '@angular/common/http';
import { IAlert } from '../../../shared/utils';
import { CanComponentDeactivate } from '../../../shared/services/can-deactivate-guard.service';
import {Role} from '../roles/role.model';


@Component({
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserDetailComponent implements OnInit, CanComponentDeactivate {
  user: User;
  message: IAlert;
  userForm: FormGroup;
  form_submitted: boolean;
  rolesOptions: IMultiSelectOption[];
  dropDownTexts: IMultiSelectTexts = {
    defaultTitle: 'Roles...'
  };
  dropDownSettings: IMultiSelectSettings= {
    buttonClasses: 'btn btn-default w-100',
    containerClasses: 'w-100',
    showCheckAll: true,
    showUncheckAll: true
  };

  constructor( private route: ActivatedRoute,
               private router: Router,
               private fb: FormBuilder,
               private userService: UserService,
               private roleService: RoleService,
               private dialog: DialogService
  ) {
    this.userForm = fb.group({
      'username': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, CustomValidators.emailValidator])],
      'password': ['', Validators.compose([Validators.required, CustomValidators.passwordValidator])],
      'roles': []
    });
  }

  ngOnInit() {
    Observable.merge(
      this.route.paramMap
        .switchMap((params: ParamMap) =>
          this.userService.getUser(params.get('id'))),
      this.roleService.getRoles().map(
        data => {
          return data.value;
        }
      )
    ).subscribe(
      (data: Array<Role>|User) => {
        if (data instanceof User) {
          this.user = data;
          this.user.password = null;
        }else if (data instanceof Array) {
          let roles: Array<any> = [];
          data.forEach((role) => {
            roles.push({id: role.name, name: role.name});
          });
          this.rolesOptions = roles;
        }
      },
      () => {
        this.rolesOptions = [];
        this.message = {
          type: 'warning',
          message: 'failed to get roles'
        };
      }
    );
  }

  onSubmit() {
    this.userService.updateUser(this.user).subscribe(
      data => {
        this.user = new User(data['user']);
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
        this.userForm.markAsPristine();
      }
    );
  }

  gotoUsers() {
    this.router.navigate(['../', {id: this.user.id}], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean>|boolean {
    if (this.userForm.pristine) { return true; }
    return this.dialog.getDialog('Discard Changes?');
  }

  closeAlert() {
    this.message = null;
  }
}
