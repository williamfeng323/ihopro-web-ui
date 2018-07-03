import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../admin/users/user.service';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import { RoleService } from '../roles/role.service';
import {CustomValidators} from '../../../shared/CustomValidators';


@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  message: string;
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


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private us: UserService,
    private rs: RoleService
  ) {
    this.userForm = fb.group({
      'username': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, CustomValidators.emailValidator])],
      'password': ['', Validators.compose([Validators.required, CustomValidators.passwordValidator])],
      'roles': []
    });
  }

  ngOnInit() {
    this.rs.getRoles().subscribe(
      (data) => {
        let roles: Array<any> = [];
        data.forEach((role) => {
          roles.push({id: role.name, name: role.name});
        });
        this.rolesOptions = roles;
      },
      error => {
        console.log(error);
        this.rolesOptions = [];
      }
    );
  }

  onSubmit() {
    this.message = null;
    this.form_submitted = true;
    if (this.userForm.valid) {
      this.us.createUser(this.userForm.value).subscribe(
        data => {},
        error => {
          alert(error);
        },
        () => {
          this.router.navigate(['../users'], { relativeTo: this.route });
        }
      );
    }
  }
}
