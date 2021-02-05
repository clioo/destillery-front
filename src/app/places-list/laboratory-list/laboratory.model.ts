import { Place } from '../place.model';

export class Laboratory extends Place {
  public hasCovidTests: boolean;

  constructor(
    id: number,
    name: string,
    latitude: number,
    longitude: number,
    distance: string,
    hasCovidTests: boolean
  ) {
    super(id, name, latitude, longitude, distance);
    this.hasCovidTests = hasCovidTests;
  }
}
