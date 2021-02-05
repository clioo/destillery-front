import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../shared/data-storage.service';
import { Location } from '../../shared/interfaces/geolocation';
import { ActivatedRoute, Router } from '@angular/router';
import { Laboratory } from './laboratory.model';
import { LaboratoryService } from './laboratory.service';
import { AppStateService } from 'src/app/Redux/AppState.service';

@Component({
  selector: 'app-laboratory-list',
  templateUrl: './laboratory-list.component.html',
  styleUrls: ['./laboratory-list.component.css'],
})
export class LaboratoryListComponent implements OnInit, OnDestroy {
  laboratories: Laboratory[];
  locationEnabled = false;
  userLocation: Location;
  loading = true;
  private laboratorySubscription: Subscription;
  subAppState: Subscription;
  constructor(
    private laboratoryService: LaboratoryService,
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

    this.laboratories = this.laboratoryService.getLaboratories();
    this.laboratorySubscription = this.laboratoryService.laboratoryChanged.subscribe(
      (laboratories: Laboratory[]) => {
        this.laboratories = laboratories;
      }
    );
  }

  ngOnDestroy() {
    if (this.laboratorySubscription) {
      this.laboratorySubscription.unsubscribe();
    }
    if (this.subAppState) {
      this.subAppState.unsubscribe();
    }
  }
}
