import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HotelComponent } from './hotel.component';
import { HotelRoutingModule } from './hotel-routing.module';
import { HotelHomeComponent } from './hotel-home.component';
import { FileUploadComponent } from './translation/file_upload/file-upload.component';
import { HotelTranslationMainComponent } from './translation/hotel-translation.component';
import { FileUploadModule } from 'ng2-file-upload';
import { GeographicComponent } from './translation/geographic/geographic.component';
import { HotelTranslationListComponent } from './translation/hotel/hotel-list.component';
import { HotelTranslationDetailComponent } from './translation/hotel/hotel-detail.component';
import { HotelService } from './translation/hotel/hotel.service';
import { HotelRoomTranslationListComponent } from './translation/hotel/hotel-room-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FileUploadModule,
    HotelRoutingModule
  ],
  declarations: [
    HotelComponent,
    HotelHomeComponent,
    HotelTranslationMainComponent,
    FileUploadComponent,
    GeographicComponent,
    HotelTranslationListComponent,
    HotelTranslationDetailComponent,
    HotelRoomTranslationListComponent,
  ],
  providers: [HotelService]
})
export class HotelModule {}
