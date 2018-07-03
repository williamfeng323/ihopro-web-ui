import {Component, OnInit} from '@angular/core';
import { Hotel } from './hotel.model';
import { HotelService } from './hotel.service';
import { IAlert } from '../../../../shared/utils';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './hotel-list.component.html',
  styleUrls: ['../../hotel.component.scss']
})
export class HotelTranslationListComponent implements OnInit {
  public hotelList: Array<Hotel>;
  public perPage = 15;
  public page = 1;
  public collectionSize = 150;
  public message: IAlert;

  ngOnInit() {
    this.getPageContent();
  }

  constructor (private hotelService: HotelService) {}

  getPageContent() {
    this.hotelList = null;
    this.hotelService.getHotelList(this.page, this.perPage).subscribe(
      (data) => {
        this.hotelList = data['hotelList'];
        this.collectionSize = data['total'];
      },
      (err) => {
        this.message = {
          type: 'warning',
          message: 'Failed to retrieve geography list'
        };
      }
    );
  }
  clickSearch(countryCode?, cityCode?, hotelCode?) {
    this.hotelService.getHotelsByCode(countryCode, cityCode, hotelCode).subscribe(
      (data) => {
        this.hotelList = data;
        this.collectionSize = data.length;
        this.perPage = data.length;
      },
      (err: HttpErrorResponse) => {
        this.message = {
          type: 'warning',
          message: err.error.message
        };
      }
    );
  }

  addHotel() {
    this.hotelList = [new Hotel].concat(this.hotelList);
  }
  closeAlert() {
    this.message = null;
  }
}
