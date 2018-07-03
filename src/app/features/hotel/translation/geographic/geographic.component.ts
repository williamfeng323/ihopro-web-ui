import { Component, OnInit } from '@angular/core';
import { GeographicService } from './geograhpic.service';
import { IAlert } from '../../../../shared/utils';
import { Geographic } from './geographic.model';
import { HttpErrorResponse } from '@angular/common/http';


interface SearchBox {
  countryName: string;
  cityName: string;
}

@Component({
  templateUrl: './geographic.component.html',
  styleUrls: ['./geographic.component.scss'],
  providers: [GeographicService]
})
export class GeographicComponent implements OnInit {
  public message: IAlert;
  public geoList: Array<Geographic>;
  public page = 1;
  public collectionSize = 150;
  public perPage = 15;
  constructor (private geoService: GeographicService) {}

  ngOnInit() {
    this.getPageContent();
  }

  getPageContent() {
    this.geoList = null;
    this.geoService.getGeosByPage(this.page, this.perPage).subscribe(
      (data) => {
        this.geoList = data['geoList'];
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
  clickSearch(countryCode, cityCode) {
    this.geoService.getGeoByCodes(countryCode, cityCode).subscribe(
      (data) => {
        this.geoList = data['geoList'];
        this.collectionSize = data['total'];
      },
      (err) => {
        this.message = {
          type: 'warning',
          message: 'Failed to search specific geography'
        };
      }
    );
  }
  closeAlert() {
    this.message = null;
  }

  addGeo() {
    this.geoList.push(new Geographic);
  }
  editGeo(target) {
    for (let input_field of target.parentElement.getElementsByTagName('input')) {
      input_field.disabled = !input_field.disabled;
    }
  }

  submit(geo: Geographic, target) {
    this.geoService.createOrUpdateGeograhicInfo(geo).subscribe(
      (data: Geographic) => {
        this.message = {
          type: 'success',
          message: 'Update Successfully'
        };
        this.geoList.forEach(
          (current_geo, ind) => {
            if (current_geo.id === data.id) {
              this.geoList[ind] = data;
            }
          }
        );
      },
      (err) => {
        console.log(err);
        this.message = {
          type: 'warning',
          message: 'Update Failed'
        };
      },
      () => {
        for (let input_field of target.parentElement.parentElement.getElementsByTagName('input')){
          input_field.disabled = true;
        }
      }
    );
  }

  delete(geo: Geographic, target, i: number) {
    if (!geo.countryCode || !geo.cityCode) {
      this.geoList.splice(i, 1);
      return null;
    }
    this.geoService.deleteGeo(geo).subscribe(
      data => {
        this.message = {
          type: 'success',
          message: data['msg']
        };
      },
      (err: HttpErrorResponse) => {
        this.message = {
          type: 'warning',
          message: err.message
        };
      },
      () => {
        this.geoList = this.geoList.splice(i, 1);
      }
    );
  }
}
