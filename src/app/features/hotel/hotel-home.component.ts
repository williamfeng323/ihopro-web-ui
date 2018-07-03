import { Component } from '@angular/core';

@Component({
  templateUrl: './hotel-home.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelHomeComponent {
  public isCollapsed = true;

  expandPanel(event: Event) {
    event.preventDefault();
    this.isCollapsed = !this.isCollapsed;
  }

}
