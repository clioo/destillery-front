import { Location } from './../shared/interfaces/geolocation';
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { SetCurrentLocation } from './Actions';
import { DataStorageService } from '../shared/data-storage.service';
export class AppStateModel {
  CurrentLocation: Location | null;
}
@State<AppStateModel>({
  name: 'App',
  defaults: {
    CurrentLocation: null,
  }
})
@Injectable()
export class AppState {
  constructor(private dataStorageService: DataStorageService) { }
  @Action(SetCurrentLocation)
  SetCurrentLocation(ctx: StateContext<AppStateModel>) {
    this.dataStorageService.getLocation().then((location) => {
      this.dataStorageService
        .getReversedGeolocation(location.latitude, location.longitude)
        .toPromise()
        .then((res) => {
          res.locationEnabled = location.locationEnabled;
          ctx.patchState({CurrentLocation: res});
        });
    });
  }
}
