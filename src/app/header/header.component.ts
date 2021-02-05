import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub:Subscription;

  constructor() {}

  ngOnInit() {

  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
