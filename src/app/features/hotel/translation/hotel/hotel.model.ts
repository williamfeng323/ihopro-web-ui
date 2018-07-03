import { Geographic } from '../geographic/geographic.model';
import { initialDate } from '../../../../shared/utils';

export class Hotel {
  id: string;
  geography: Geographic;
  hotelCode: string;
  hotelNameEn: string;
  hotelNameZh: string;
  addressLine: Array<string>;
  phone: string;
  fax: string;
  lastUpdateAt: Date|void;

  constructor ( obj?: any ) {
    this.id = obj && obj.id;
    this.geography = new Geographic(obj && obj.geography);
    this.hotelCode = obj && obj.hotel_code;
    this.hotelNameEn = obj && obj.hotel_name_en;
    this.hotelNameZh = obj && obj.hotel_name_zh;
    this.addressLine = obj && obj.address_line;
    this.phone = obj && obj.phone;
    this.fax = obj && obj.fax;
    this.lastUpdateAt = initialDate(obj && obj.last_update_at);
  }
}

export class HotelRoom {
  id: string;
  hotel: Hotel;
  hotelRoomNameEn: string;
  hotelRoomNameZh: string;

  constructor (obj?) {
    this.id = obj && obj.id;
    this.hotel = obj && obj.hotel;
    this.hotelRoomNameEn = obj && obj.room_name_en;
    this.hotelRoomNameZh = obj && obj.room_name_zh;
  }
}
