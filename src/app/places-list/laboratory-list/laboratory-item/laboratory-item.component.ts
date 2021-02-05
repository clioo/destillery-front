import { Component, Input, OnInit } from '@angular/core';
import { Laboratory } from '../laboratory.model';

@Component({
  selector: 'app-laboratory-item',
  templateUrl: './laboratory-item.component.html',
  styleUrls: ['./laboratory-item.component.css']
})
export class LaboratoryItemComponent implements OnInit {
  @Input() laboratory: Laboratory;
  @Input() index: number;
  @Input() locationEnabled: number;
  constructor() { }

  ngOnInit() {
  }

}
