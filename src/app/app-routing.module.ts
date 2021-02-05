import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesListComponent } from './places-list/places-list.component';
import { HospitalListComponent } from './places-list/hospital-list/hospital-list.component';
import { HospitalsResolverService } from './places-list/hospital-list/hospital-resolver.service';
import { LaboratoryResolverService } from './places-list/laboratory-list/laboratory-resolver.service';
import { LaboratoryListComponent } from './places-list/laboratory-list/laboratory-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/places', pathMatch: 'full' },
  { path: 'places', component: PlacesListComponent, resolve: [HospitalsResolverService, LaboratoryResolverService]},
  { path: 'hospitals', component: HospitalListComponent, resolve: [HospitalsResolverService]},
  { path: 'laboratories', component: LaboratoryListComponent, resolve: [LaboratoryResolverService]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
