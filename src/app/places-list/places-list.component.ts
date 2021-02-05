import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Hospital } from './hospital-list/hospital.model';
import { HospitalService } from './hospital-list/hospital.service';
import { Location } from '../shared/interfaces/geolocation';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css']
})
export class PlacesListComponent implements OnInit, OnDestroy {
  hospitals: Hospital[];
  locationEnabled = false;
  userLocation: Location;
  loading = true;

  private hospitalSubscription: Subscription;
  private laboratorySubscription: Subscription;
  constructor(private hospitalService: HospitalService,
    private dataStorageService: DataStorageService) { }

  ngOnInit() {
    if (navigator.permissions){
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


  ngOnDestroy(): void {
    this.hospitalSubscription.unsubscribe();
  }

}
