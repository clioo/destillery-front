import { Injectable } from '@angular/core';

import { Laboratory } from './laboratory.model';
import { Subject } from 'rxjs';

@Injectable()
export class LaboratoryService {
  laboratoryChanged = new Subject<Laboratory[]>();

  private laboratories: Laboratory[] = [];

  constructor() {}

  getLaboratories() {
    return this.laboratories.slice();
  }

  getLaboratory(index: number) {
    return this.laboratories[index];
  }

  addLaboratory(laboratory: Laboratory) {
    this.laboratories.push(laboratory);
    this.laboratoryChanged.next(this.laboratories.slice());
  }

  updateLaboratory(index: number, newLaboratory: Laboratory) {
    this.laboratories[index] = newLaboratory;
    this.laboratoryChanged.next(this.laboratories.slice());
  }

  deleteLaboratory(index: number) {
    this.laboratories.splice(index, 1);
    this.laboratoryChanged.next(this.laboratories.slice());
  }

  setLaboratories(laboratories: Laboratory[]) {
    this.laboratories = laboratories;
    this.laboratoryChanged.next(this.laboratories.slice());
  }
}
