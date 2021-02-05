import { Component, OnInit } from '@angular/core';
import { SeederService } from './Redux/Seeder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private seederService: SeederService) {}
  ngOnInit() {

  }
}
