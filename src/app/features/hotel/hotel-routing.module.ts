import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelComponent } from './hotel.component';
import { AuthGuard } from '../../shared/services/auth-guard.service';
import { HotelHomeComponent } from './hotel-home.component';
import { HotelTranslationMainComponent } from './translation/hotel-translation.component';
import { FileUploadComponent } from './translation/file_upload/file-upload.component';
import { GeographicComponent } from './translation/geographic/geographic.component';
import { HotelTranslationListComponent } from './translation/hotel/hotel-list.component';
import { CanDeactivateGuard } from '../../shared/services/can-deactivate-guard.service';
import { HotelTranslationDetailComponent } from './translation/hotel/hotel-detail.component';

const hotelRoutes: Routes = [
  {
    path: '',
    component: HotelComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'translation',
        component: HotelTranslationMainComponent,
        canActivateChild: [AuthGuard],
        children: [
          { path: 'fileUpload', component: FileUploadComponent},
          { path: 'geoTranslation', component: GeographicComponent},
          { path: 'hotelTranslation', component: HotelTranslationListComponent },
          {
            path: 'hotelTranslation/:id',
            component: HotelTranslationDetailComponent,
            canDeactivate: [CanDeactivateGuard]
          },
          { path: '', component: HotelHomeComponent }
        ]
      },
      { path: '', component: HotelHomeComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(hotelRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HotelRoutingModule {}
