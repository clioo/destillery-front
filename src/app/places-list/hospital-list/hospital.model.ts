import { Place } from '../place.model';

export class Hospital extends Place {
  public hasVaccine: boolean;
  public infectedNumber: number;

  constructor(
    id: number,
    name: string,
    latitude: number,
    longitude: number,
    distance: string,
    hasVaccine: boolean,
    infectedNumber: number
  ) {
    super(id, name, latitude, longitude, distance);
    this.hasVaccine = hasVaccine;
    this.infectedNumber = infectedNumber;
  }
}
