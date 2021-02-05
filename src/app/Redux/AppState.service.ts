import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { AppState, AppStateModel } from './Reducer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  @Select(AppState)
  db!: Observable<AppStateModel>;
  constructor() {
  }
}
