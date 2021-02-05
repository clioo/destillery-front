import { Component, Input, OnInit } from '@angular/core';
import { Hospital } from '../hospital.model';

@Component({
  selector: 'app-hospital-item',
  templateUrl: './hospital-item.component.html',
  styleUrls: ['./hospital-item.component.css'],
})
export class HospitalItemComponent implements OnInit {
  @Input() hospital: Hospital;
  @Input() index: number;
  @Input() locationEnabled: number;
  constructor() {}

  ngOnInit() {}
}
