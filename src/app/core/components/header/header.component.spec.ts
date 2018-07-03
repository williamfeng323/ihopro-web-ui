import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { LoginFormComponent, LoginModalComponent } from './login.component';
import {AuthenticationService, AuthorityCheckDirective} from '../../../shared/services/authentication.service';
import { AuthenticationServiceStub } from '../../../shared/services/authentication.service.spec';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('HeaderComponent', () => {
  let fixture;
  let authService;

  beforeEach( async() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthorityCheckDirective,
        HeaderComponent,
        LoginModalComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
      ],
      providers: [
        {provide: AuthenticationService, useValue: AuthenticationServiceStub}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    authService = TestBed.get(AuthenticationService);

  });

  it('should render Admin link when user is logged in', async(() => {
    authService.login();
    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.admin-link').getAttribute('style')).toContain('display: inherit');
    authService.logout();
  }));

  it('should not render Admin button when user is not admin role', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('.admin-link').getAttribute('style')).toContain('display: none');
  }));
});

describe('Login Component', () => {
  let fixture;
  let authService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginModalComponent,
        LoginFormComponent
      ],
      providers: [
        {provide: AuthenticationService, useValue: AuthenticationServiceStub}
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginModalComponent);
    authService = TestBed.get(AuthenticationService);
  }));

  it('should render login when user is logout status', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('div').textContent).toContain('Login');
  }));

  it('should render login form modal when click login button', () => {
    let comp = fixture.componentInstance;
    let spy = spyOn(comp, 'open');
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('div').click();
    expect(spy.calls.any()).toBe(true);
  });

  it('should render logout when user is login status', async(() => {
    authService.login();
    let comp = fixture.componentInstance;
    fixture.detectChanges();
    let el = fixture.debugElement.nativeElement.querySelector('div');
    expect(el.textContent).toContain('Logout');
    let spy = spyOn(comp, 'logout');
    el.click();
    expect(spy.calls.any()).toBe(true);
  }));
});
