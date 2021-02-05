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
  styleUrls: ['./hospital-list.component.css']
})
export class HospitalListComponent implements OnInit, OnDestroy {

  hospitals: Hospital[];
  locationEnabled = false;
  userLocation: Location;
  loading = true;
  private hospitalSubscription: Subscription;

  constructor(private hospitalService: HospitalService,
              private router: Router,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    if(navigator.permissions){
      navigator.permissions.query({ name: 'geolocation' })
        .then((permission) => {
          if (permission.state == 'denied') {
            this.loading = false;
            this.locationEnabled = false;
          } else {
            this.locationEnabled = true;
            this.dataStorageService.getLocation().then(location => {
              this.dataStorageService
                .getReversedGeolocation(location.latitude, location.longitude).toPromise().then((res) => {
                  this.userLocation = res;
                  this.loading = false;
                });
            });
          }
        });
    }

    this.hospitals = this.hospitalService.getHospitals();
    this.hospitalSubscription = this.hospitalService.hospitalChanged
      .subscribe(
        (hospitals: Hospital[]) => {
          this.hospitals = hospitals;
        }
      );
  }

  ngOnDestroy() {
    this.hospitalSubscription.unsubscribe();
  }

}
