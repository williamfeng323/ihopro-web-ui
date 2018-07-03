import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule} from './admin-rounting.module';
import { AdminHomeComponent } from './admin-home.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { RoleService } from './roles/role.service';
import { UserService } from './users/user.service';
import { UserDetailComponent } from './users/user-detail.component';
import { UserListComponent } from './users/user-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoleComponent } from './roles/role.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MultiselectDropdownModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    RegisterComponent,
    UserListComponent,
    UserDetailComponent,
    RoleComponent
  ],
  providers: [RoleService, UserService]
})
export class AdminModule {}
