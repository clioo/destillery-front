import { SetCurrentLocation } from './Actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class SeederService {
  constructor(private store: Store) {
    this.store.dispatch(new SetCurrentLocation());
  }
}
