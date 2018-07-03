import {Component, Input, OnInit} from '@angular/core';
import {Hotel, HotelRoom} from './hotel.model';
import { HotelService } from './hotel.service';
import {IAlert} from '../../../../shared/utils';

@Component({
  selector: 'app-hotel-room-list',
  templateUrl: './hotel-room-list.component.html',
  styleUrls: ['./hotel-detail.component.scss', '../../hotel.component.scss']
})
export class HotelRoomTranslationListComponent implements OnInit {
  @Input() hotel: Hotel;
  roomList: Array<HotelRoom>;
  message: IAlert;

  ngOnInit() {
    this.hotelService.getRoomList(this.hotel).subscribe(
      data => {
        this.roomList = data;
      }
    );
  }
  constructor(private hotelService: HotelService) {}

  addRoom() {
    this.roomList = [new HotelRoom({hotel: this.hotel})].concat(this.roomList);
  }
  editRoom(target): void {
    for (let input_field of target.parentElement.getElementsByTagName('input')) {
      input_field.disabled = !input_field.disabled;
    }
  }
  submit(room: HotelRoom, target, i) {
    if (!room.hotelRoomNameZh || !room.hotelRoomNameEn) {
      this.message = {
        type: 'warning',
        message: 'Hotel Room Name EN and Hotel Room Name ZH must not be empty'
      };
      return null;
    }
    this.hotelService.createOrUpdateRoom(room).subscribe(
      data => {
        this.roomList[i] = data;
        this.message = {
          type: 'success',
          message: 'Update room successfully'
        };
      },
      err => {
        this.message = {
          type: 'warning',
          message: 'Update room failed'
        };
      },
      () => {
        for (let input_field of target.parentElement.parentElement.getElementsByTagName('input')){
          input_field.disabled = true;
        }
      }
    );
  }
  delete(room: HotelRoom, target, i: number) {
    if (!room.hotelRoomNameZh || !room.hotelRoomNameEn) {
      this.roomList.splice(i, 1);
      return null;
    }
    this.hotelService.deleteRoom(room).subscribe(
      data => {
        this.message = {
          type: 'success',
          message: data['msg']
        };
      },
      err => {
        this.message = {
          type: 'warning',
          message: 'Delete room failed'
        };
      },
      () => {
        this.roomList.splice(i, 1);
      }
    );
  }
  closeAlert() {
    this.message = null;
  }
}
