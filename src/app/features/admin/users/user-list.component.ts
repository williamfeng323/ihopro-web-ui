import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import {Component, OnInit} from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserListComponent implements OnInit {
  users: Observable<User[]>;
  message: String;

  private selectedId: string;

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.selectedId = params.get('id');
        return this.service.getUsers();
    }).subscribe(
      (userList) => {
        this.users = userList;
      },
      (error) => {
        alert(error.message);
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    );
  }

  isSelected(user: User) { return user.id === this.selectedId; }

  deleteUser(event) {
    console.log(event);
  }
}
