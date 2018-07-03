import {Component, OnInit} from '@angular/core';
import {Hotel} from './hotel.model';
import {HotelService} from './hotel.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {IAlert} from '../../../../shared/utils';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogService} from '../../../../shared/services/dialog.service';
import {Observable} from 'rxjs/Observable';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelTranslationDetailComponent implements OnInit {
  hotel: Hotel;
  hotelId: string;
  message: IAlert;
  hotelForm: FormGroup;
  formIsSubmitted: boolean;

  get addressLine(): FormArray{
    return this.hotelForm.get('addressLine') as FormArray;
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.hotelId = params.get('id');
        if (params.get('id') === '0') {
          return Observable.of(new Hotel);
        }else {
          return this.hotelService.getHotel(params.get('id'));
        }
      }
    ).subscribe(
      data => {
        this.hotel = data;
        this.initialForm();
      }
    );
  }
  initialForm() {
    this.hotelForm.reset({
      'hotelCode': this.hotel.hotelCode,
      'hotelNameEn': this.hotel.hotelNameEn,
      'hotelNameZh': this.hotel.hotelNameZh,
      'fax': this.hotel.fax,
      'phone': this.hotel.phone
    });
    this.hotelForm.get('geography').reset(
      {
        'countryCode': {value: this.hotel.geography.countryCode, disabled: true},
        'cityCode': {value: this.hotel.geography.cityCode, disabled: true}
      }
    );
    let addressFormArray;
    if (!!this.hotel.id) {
      addressFormArray =  this.fb.array(
        this.hotel.addressLine.map( address => this.fb.control(address)));
    }else {
      addressFormArray =  this.fb.array(
        ['', '', '', ''].map( address => this.fb.control(address)));
    }
    this.hotelForm.setControl('addressLine', addressFormArray);
  }
  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: DialogService,
    private fb: FormBuilder
  ) {
    this.hotelForm = fb.group({
      'geography': this.fb.group({
        'countryCode': ['', Validators.required],
        'cityCode': ['', Validators.required]
      }),
      'hotelCode': ['', Validators.required],
      'hotelNameEn': [''],
      'hotelNameZh': [''],
      'addressLine': this.fb.array([]),
      'fax': [''],
      'phone': ['']
    });
  }

  closeAlert() {
    this.message = null;
  }
  onSubmit() {
    if (!this.hotelForm.valid || this.hotelForm.pristine) {
      return false;
    }
    this.hotelService.updateHotel(this.hotelId, this.hotelForm.getRawValue()).subscribe(
      data => {
        this.message = {
          type: 'success',
          message: 'Hotel Updated Successfully'
        };
      },
      (err: HttpErrorResponse) => {
        this.message = {
          type: 'warning',
          message: 'Hotel Updated Failed due to: ' + err.error.message
        };
      },
      () => {
        this.hotelForm.markAsPristine();
        this.backToList();
      }
    );
  }
  backToList() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  canDeactivate(): Observable<boolean>|boolean {
    if (this.hotelForm.pristine) {
      return true;
    }
    return this.dialog.getDialog('Discard Changes?');
  }
  editGeo(target) {
    let input = target.parentElement.getElementsByTagName('input')[0];
    input.disabled = !input.disabled;
  }
}
