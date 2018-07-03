import { HttpClient } from '@angular/common/http';
import { Hotel, HotelRoom } from './hotel.model';
import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HotelService {
  public currentHotelList: Array<Hotel>;

  constructor (private http: HttpClient) {}

  getHotelList (page = 1, per_page = 15, all = '') {
    return this.http.get('/api/hotels?page=' + page + '&per_page=' + per_page + '&all=' + all).map(
      (data) => {
        let hotelList: Hotel[] = [];
        if (data['hotel_page_content'] instanceof  Array) {
          for (let hotel of data['hotel_page_content']) {
            hotelList.push(new Hotel(hotel));
          }
        }
        this.currentHotelList = hotelList;
        return {hotelList: hotelList, total: data['total_items']};
      }
    );
  }
  getHotel (hotelId: string): Observable<Hotel> {
   let hotel = _.findWhere(this.currentHotelList, {id: hotelId});
   if (!hotel) {
     return this.http.get('/api/hotels/' + hotelId).map(
       data => {
         return new Hotel(data);
       }
     );
   }
   return Observable.of(hotel);
  }
  getHotelsByCode (countryCode?, cityCode?, hotelCode?) {
    let url: string;
    let valid_data = {
      countryCode: countryCode,
      cityCode: cityCode,
      hotelCode: hotelCode
    };
    valid_data = _.omit(valid_data, (val, key, obj) => {
      return !val;
    });
    url = '/api/hotels/0?';
    _.forEach(valid_data, (val, key, obj) => {
      val = val.toUpperCase();
      url += '&' + key + '=' + val;
    });
    return this.http.get(url).map(
      (data) => {
        let hotelList: Hotel[] = [];
        if (data instanceof  Array) {
          for (let hotel of data) {
            hotelList.push(new Hotel(hotel));
          }
        }
        this.currentHotelList = hotelList;
        return hotelList;
      }
    );
  }
  updateHotel (id: string, hotel) {
    let url = `/api/hotels/${id}`;
    return this.http.post(url, hotel);
  }
  getRoomList (hotel: Hotel) {
    return this.http.get(`/api/hotels/${hotel.id}/hotel_rooms`).map(
      data => {
        let hotelRoomList: HotelRoom[] = [];
        if (data instanceof  Array) {
          for (let room of data) {
            hotelRoomList.push(new HotelRoom(room));
          }
        }
        return hotelRoomList;
      }
    );
  }
  deleteRoom (room: HotelRoom) {
    return this.http.delete(`/api/hotels/${room.hotel.id}/hotel_rooms?id=${room.id}`);
  }
  createOrUpdateRoom (room: HotelRoom) {
    return this.http.post(`/api/hotels/${room.hotel.id}/hotel_rooms`, room).map(
      data => {
        return new HotelRoom(data);
      }
    );
  }
}
