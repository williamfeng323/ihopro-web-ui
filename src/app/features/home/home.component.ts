import {Component, OnInit, OnChanges} from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { CustomValidators } from '../../shared/CustomValidators';
import { AuthenticationService } from '../../shared/services/authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../admin/users/user.model';
import * as _ from 'underscore';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  form_submitted: boolean;
  current_user: User;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, CustomValidators.emailValidator])],
      'password': ['', Validators.compose([Validators.required, CustomValidators.passwordValidator])]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        this.returnUrl = param.get('returnUrl') || null;
      }
    );
    this.form_submitted = false;
    this.current_user = this.authService.getCurrentUser();
  }
  onSubmit() {
    this.message = null;
    this.form_submitted = true;
    if (this.loginForm.valid) {
      let {email, password} = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        data => { },
        (err: HttpErrorResponse) => {
          this.message = (_.values(err.error.response.errors).join(','));
        },
        () => {
          if (this.returnUrl) {
            this.router.navigate([this.returnUrl]);
          }else {
            location.reload();
          }
        }
      );
    }
  }
}
