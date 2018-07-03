import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/pagenotfound/pagenotfound.component';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './shared/services/auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin',
    loadChildren: 'app/features/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'hotel',
    loadChildren: 'app/features/hotel/hotel.module#HotelModule',
    canLoad: [AuthGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
