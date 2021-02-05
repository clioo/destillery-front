import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { Hospital } from '../places-list/hospital-list/hospital.model';
import { HospitalService } from '../places-list/hospital-list/hospital.service';
import { Location } from '../shared/interfaces/geolocation';
import { Laboratory } from '../places-list/laboratory-list/laboratory.model';
import { LaboratoryService } from '../places-list/laboratory-list/laboratory.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  url = 'http://127.0.0.1:8000/api/covid-places/'
  constructor(private http: HttpClient, private hospitalService: HospitalService, private laboratoryService: LaboratoryService) {

  }

  getLocation(): Promise<Location> {
    return new Promise<Location>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position.coords.latitude) {
          const res: Location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          resolve(res);
        } else {
          const res: Location = {
            latitude: 53,
            longitude: 0
          }
          resolve(res);
        }
      }, (error) => {
        const res: Location = {
          latitude: 53,
          longitude: 0
        }
        resolve(res);
      });
    });
  }


  fetchHospitals(latitude = 53.0, longitude = 0) {
    return this.http.get<Hospital[]>(`${this.url}hospitals/?latitude=${latitude}&longitude=${longitude}`).pipe(
      map((hospitals: any) => {
        return hospitals.results.map((hospital: any) => {
          return new Hospital(hospital.id, hospital.name, hospital.latitude,
            hospital.longitude, hospital.distance,
            hospital.has_vaccine, hospital.infected_number)
        })
      }),
      tap(hospitals => {
        this.hospitalService.setHospitals(hospitals);
      }));
  }

  fetchLaboratories(latitude = 53.0, longitude = 0) {
    return this.http.get<Laboratory[]>(`${this.url}laboratories/?latitude=${latitude}&longitude=${longitude}`).pipe(
      map((laboratory: any) => {
        return laboratory.results.map((lab: any) => {
          return new Laboratory(lab.id, lab.name, lab.latitude,
            lab.longitude, lab.distance,
            lab.has_covid_tests)
        })
      }),
      tap(laboratories => {
        this.laboratoryService.setLaboratories(laboratories);
      }));
  }

  getReversedGeolocation(latitude: number, longitude: number) {
    let url = `${this.url}reverse-geocoding/?latlng=${latitude},${longitude}`;
    return this.http.get<Location>(url).pipe(
      map((location: any) => {
        console.log(location)
        let geolocation: Location = {
          latitude: latitude,
          longitude: longitude,
          address: location.address,
          street: location.street,
          city: location.city
        };
        return geolocation;
      })
    )
  }

  getGeocoding(address: string) {
    let url = `${this.url}geocoding/?address=${address}`;
    return this.http.get<Location>(url).pipe(
      map((location: any) => {
        if (location){
          let geolocation: Location = {
            latitude: location.lat,
            longitude: location.lng,
            address: address,
          };
          return geolocation;
        } else {
          return {address: address}
        }
      })
    )
    
  }

}
