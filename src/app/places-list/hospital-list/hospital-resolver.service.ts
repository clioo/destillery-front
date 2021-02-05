import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Hospital } from './hospital.model';
import { DataStorageService } from '../../shared/data-storage.service';
import { HospitalService } from './hospital.service';
import { Location } from '../../shared/interfaces/geolocation';

@Injectable({
  providedIn: 'root',
})
export class HospitalsResolverService implements Resolve<Promise<Hospital[]>> {
  constructor(
    private dataStorageService: DataStorageService,
    private hospitalService: HospitalService
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Hospital[]> {
    const hospitals = this.hospitalService.getHospitals();
    const latlng: Location = await this.dataStorageService.getLocation();
    if (hospitals.length === 0) {
      return this.dataStorageService
        .fetchHospitals(latlng.latitude, latlng.longitude)
        .toPromise();
    } else {
      return hospitals;
    }
  }
}
