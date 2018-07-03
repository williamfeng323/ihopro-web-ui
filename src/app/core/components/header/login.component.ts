import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';

import { CustomValidators } from '../../../shared/CustomValidators';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { User } from '../../../features/admin/users/user.model';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login-modal-component',
  template: `<div *ngIf="authService.isLoggedin(); else login" (click)="logout()">Logout</div>
  <ng-template #login ><div (click)="open()">Login</div></ng-template>
  `,
  styleUrls: ['./header.component.css']
})
export class LoginModalComponent implements OnInit {

  user: User;
  constructor(private modalService: NgbModal,
              public authService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('current_user'));
  }

  open(): void {
    this.modalService.open(LoginFormComponent);
  }

  logout(): void {
    this.authService.logout();
    location.reload();
  }
}

@Component({
  selector: 'app-login-form-component',
  templateUrl: './login.form.component.html',
  styleUrls: ['./header.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  form_submitted: boolean;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    public activeModal: NgbActiveModal) {
      this.loginForm = this.fb.group({
        'email': ['', Validators.compose([Validators.required, CustomValidators.emailValidator])],
        'password': ['', Validators.compose([Validators.required, CustomValidators.passwordValidator])]
    });
  }
  ngOnInit() {
    this.returnUrl = this.router.routerState.snapshot.url;
    this.form_submitted = false;
  }
  onSubmit() {
    this.message = null;
    this.form_submitted = true;
    if (this.loginForm.valid) {
      let {email, password} = this.loginForm.value;
      this.auth.login(email, password).subscribe(
        data => { },
        (err: HttpErrorResponse) => {
          this.message = err.message;
          },
        () => {
          this.router.navigate([this.returnUrl.split(';')[0]]).then();
          this.activeModal.close();
          location.reload();
        }
      );
    }else {
      console.log(this.loginForm.status);
    }
  }
  gotoRegister() {
    this.activeModal.close();
    this.router.navigate(['/register']);
  }
}
