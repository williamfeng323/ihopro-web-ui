import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './users/user-list.component';
import { UserDetailComponent } from './users/user-detail.component';
import { AuthGuard } from '../../shared/services/auth-guard.service';
import { CanDeactivateGuard } from '../../shared/services/can-deactivate-guard.service';
import { RoleComponent } from './roles/role.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'register', component: RegisterComponent},
          { path: 'users', component: UserListComponent},
          {
            path: 'users/:id',
            component: UserDetailComponent,
            canDeactivate: [CanDeactivateGuard]
          },
          {
            path: 'roles',
            component: RoleComponent
          },
          { path: '', component: AdminHomeComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
