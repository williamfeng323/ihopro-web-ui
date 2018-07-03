import { TestBed } from '@angular/core/testing';
import { HotelComponent } from './hotel.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HotelHomeComponent } from './hotel-home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('Hotel Component', () => {
  let fixture;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HotelComponent
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HotelComponent);
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});

describe('Hotel Home Component', () => {
  let fixture;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule
      ],
      declarations: [
        HotelHomeComponent
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HotelHomeComponent);
  });

  it('should render icons', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('a .hotel-icon').length).toBe(2);
    expect(compiled.querySelectorAll('a h5')[0].innerText).toContain('Translation Management');
    expect(compiled.querySelectorAll('a h5')[1].innerText).toContain('Hotel Management');
  });
});
