import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../shared/data-storage.service';
import { Location } from '../../shared/interfaces/geolocation';
import { ActivatedRoute, Router } from '@angular/router';
import { Laboratory } from './laboratory.model';
import { LaboratoryService } from "./laboratory.service";

@Component({
  selector: 'app-laboratory-list',
  templateUrl: './laboratory-list.component.html',
  styleUrls: ['./laboratory-list.component.css']
})
export class LaboratoryListComponent implements OnInit, OnDestroy {
  laboratories: Laboratory[];
  locationEnabled = false;
  userLocation: Location;
  loading = true;
  private laboratorySubscription: Subscription;

  constructor(private laboratoryService: LaboratoryService,
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
            
                this.laboratories = this.laboratoryService.getLaboratories();
                this.laboratorySubscription = this.laboratoryService.laboratoryChanged
                  .subscribe(
                    (laboratories: Laboratory[]) => {
                      this.laboratories = laboratories;
                    }
                  );
              }
            
              ngOnDestroy() {
                this.laboratorySubscription.unsubscribe();
              }
}
