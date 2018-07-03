import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './core/app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { LoginModalComponent, LoginFormComponent } from './core/components/header/login.component';
import { PageNotFoundComponent } from './core/components/pagenotfound/pagenotfound.component';
import { AuthenticationService, AuthorityCheckDirective } from './shared/services/authentication.service';
import { ApiInterceptor } from './shared/app-config';
import { HomeComponent } from './features/home/home.component';
import {DialogService} from './shared/services/dialog.service';
import {AuthGuard} from './shared/services/auth-guard.service';
import {CanDeactivateGuard} from './shared/services/can-deactivate-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthorityCheckDirective,
    HeaderComponent,
    LoginModalComponent,
    LoginFormComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  entryComponents: [LoginFormComponent],
  providers: [DialogService, AuthGuard, CanDeactivateGuard, AuthenticationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
