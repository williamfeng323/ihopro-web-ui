import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { LoginModalComponent } from './components/header/login.component';
import { LoginFormComponent } from './components/header/login.component';
import { AuthenticationService, AuthorityCheckDirective } from '../shared/services/authentication.service';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HomeComponent } from '../features/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { DialogService } from '../shared/services/dialog.service';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { CanDeactivateGuard } from '../shared/services/can-deactivate-guard.service';
import {AuthenticationServiceStub} from '../shared/services/authentication.service.spec';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let authService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
      providers: [
        DialogService,
        AuthGuard,
        CanDeactivateGuard,
        AuthenticationService,
        {provide: AuthenticationService, useValue: AuthenticationServiceStub},
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: ComponentFixtureAutoDetect, useValue: true}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    authService = TestBed.get(AuthenticationService);
  }));

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in head tag', async(() => {
    // fixture.detectChanges(); use only when need to binding data
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('nav .navbar-brand').textContent).toContain('GTA - Internal Tools');
  }));
});
