import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { PlacesListComponent } from './places-list/places-list.component';
import { HospitalListComponent } from './places-list/hospital-list/hospital-list.component';
import { LaboratoryListComponent } from './places-list/laboratory-list/laboratory-list.component';
import { HospitalService } from './places-list/hospital-list/hospital.service';
import { HospitalItemComponent } from './places-list/hospital-list/hospital-item/hospital-item.component';
import { LaboratoryService } from './places-list/laboratory-list/laboratory.service';
import { LaboratoryItemComponent } from './places-list/laboratory-list/laboratory-item/laboratory-item.component';
import { DistancePipe } from './places-list/distance.pipe';
import { SearchComponent } from './shared/search/search.component';
import { AppState } from './Redux/Reducer';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    PlacesListComponent,
    HospitalListComponent,
    LaboratoryListComponent,
    HospitalItemComponent,
    LaboratoryItemComponent,
    DistancePipe,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([
      AppState
    ], { developmentMode: !environment.production }),
  ],
  providers: [HospitalService, LaboratoryService],
  bootstrap: [AppComponent],

  entryComponents: [ ]
})
export class AppModule { }
