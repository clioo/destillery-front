import { Injectable } from '@angular/core';

import { Hospital } from './hospital.model';
import { Subject } from 'rxjs';

@Injectable()
export class HospitalService {
  hospitalChanged = new Subject<Hospital[]>();

  private hospitals: Hospital[] = [];

  constructor() {}

  getHospitals() {
    return this.hospitals.slice();
  }

  getHospital(index: number) {
    return this.hospitals[index];
  }

  addHospital(hospital:Hospital){
    this.hospitals.push(hospital);
    this.hospitalChanged.next(this.hospitals.slice())
  }

  updateHospital(index:number, newHospital:Hospital){
    this.hospitals[index] = newHospital;
    this.hospitalChanged.next(this.hospitals.slice())
  }

  deleteHospital(index:number) {
    this.hospitals.splice(index, 1);
    this.hospitalChanged.next(this.hospitals.slice())
  }

  setHospitals(hospitals: Hospital[]){
    this.hospitals = hospitals;
    this.hospitalChanged.next(this.hospitals.slice());
  }

}
