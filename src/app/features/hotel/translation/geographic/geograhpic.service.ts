import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Geographic } from './geographic.model';

@Injectable()
export class GeographicService {

  constructor(private http: HttpClient) {}

  getGeosByPage(page = 1, per_page = 15, all = '') {
    return this.http.get('/api/geographies?page=' + page + '&per_page=' + per_page + '&all=' + all).map(
      (data) => {
        let geoList: Geographic[] = [];
        if (data['geo_page_content'] instanceof  Array) {
          for (let geo of data['geo_page_content']) {
            geoList.push(new Geographic(geo));
          }
        }
        return {geoList: geoList, total: data['total_items']};
      }
    );
  }

  getGeoByCodes(countryCode?: string, cityCode?: string): Observable<any> {
    if (countryCode === '' && cityCode === '') {
      return Observable.throw(new HttpErrorResponse({statusText: 'Incorrect message', status: 400}));
    }
    let url: string;
    if (!!countryCode && !cityCode) {
      url = '/api/geographies/0?countryCode=' + countryCode.toUpperCase();
    }else if (!!cityCode && !countryCode) {
      url = '/api/geographies/0?cityCode=' + cityCode.toUpperCase();
    }else {
      url = '/api/geographies/0?countryCode=' + countryCode.toUpperCase() + '&cityCode=' + cityCode.toUpperCase();
    }
    return this.http.get(url).map(
      (data) => {
        let geoList: Geographic[] = [];
        let total: number;
        if (data instanceof  Array) {
          for (let geo of data) {
            geoList.push(new Geographic(geo));
          }
          total = data.length;
        }
        return {geoList: geoList, total: total};
      }
    );
  }
  createOrUpdateGeograhicInfo(geo: Geographic) {
    return this.http.post('/api/geographies', geo).map(
      (data) => {
        return new Geographic(data);
      }
    );
  }

  deleteGeo(geo: Geographic) {
    return this.http.delete('/api/geographies/' + geo.id);
  }
}
