import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '../interfaces/geolocation';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { switchAll } from 'rxjs/operators';
import { DataStorageService } from '../data-storage.service';
import { HospitalService } from 'src/app/places-list/hospital-list/hospital.service';
import { LaboratoryService } from 'src/app/places-list/laboratory-list/laboratory.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() searchLabs: boolean;
  @Input() searchHospitals: boolean;
  loading = false;
  hospSubscription: Subscription;
  labSubscription: Subscription;
  searchForm: FormGroup;
  location: Location = {
    address: '',
  };
  constructor(
    private dataStorageService: DataStorageService,
    private hospitalService: HospitalService,
    private laboratoryService: LaboratoryService
  ) {
    this.searchForm = new FormGroup({
      address: new FormControl(this.location.address, [Validators.required]),
    });
  }

  ngOnInit() {}
  onSubmit() {
    if (this.searchForm.valid) {
      this.loading = true;
      const address = this.searchForm.controls.address.value;
      this.searchForm.reset();
      this.dataStorageService
        .getGeocoding(address)
        .toPromise()
        .then(
          (res) => {
            if (!res.latitude) {
              this.loading = false;
              this.searchForm.controls.address.setValue(address);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Address not found',
                footer: 'Please, be more specific',
              });
            } else {
              if (this.searchHospitals) {
                this.hospSubscription = this.dataStorageService
                  .fetchHospitals(res.latitude, res.longitude)
                  .subscribe((data) => {
                    console.log(data)
                    this.hospitalService.setHospitals(data);
                  });
              }
              if (this.searchLabs) {
                this.labSubscription = this.dataStorageService
                  .fetchLaboratories(res.latitude, res.longitude)
                  .subscribe((data) => {
                    this.laboratoryService.setLaboratories(data);
                  });
              }
              this.loading = false;
            }
          },
          (err) => {
            this.loading = false;
            Error(err);
          }
        );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid input',
        footer: 'Enter a valid address',
      });
    }
  }
  ngOnDestroy() {
    if (this.hospSubscription) {
      this.hospSubscription.unsubscribe();
    }
  }
}
