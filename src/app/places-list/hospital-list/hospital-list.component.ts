import { AppStateService } from './../../Redux/AppState.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../shared/data-storage.service';
import { Hospital } from '../hospital-list/hospital.model';
import { HospitalService } from '../hospital-list/hospital.service';
import { Location } from '../../shared/interfaces/geolocation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css'],
})
export class HospitalListComponent implements OnInit, OnDestroy {
  hospitals: Hospital[];
  locationEnabled = false;
  userLocation: Location;
  loading = true;
  private hospitalSubscription: Subscription;
  subAppState: Subscription;
  constructor(
    private hospitalService: HospitalService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private ass: AppStateService
  ) {}

  ngOnInit() {
    this.subAppState = this.ass.db.subscribe(appState => {
      if (appState.CurrentLocation) {
        this.locationEnabled = appState.CurrentLocation.locationEnabled;
        this.userLocation = JSON.parse(JSON.stringify(appState.CurrentLocation));
        delete this.userLocation.locationEnabled; // It's not necesary
        this.loading = false;
      }
    });
    this.hospitals = this.hospitalService.getHospitals();
    this.hospitalSubscription = this.hospitalService.hospitalChanged.subscribe(
      (hospitals: Hospital[]) => {
        this.hospitals = hospitals;
      }
    );
  }

  ngOnDestroy() {
    if (this.hospitalSubscription) {
      this.hospitalSubscription.unsubscribe();
    }
    if (this.subAppState) {
      this.subAppState.unsubscribe();
    }
  }
}
