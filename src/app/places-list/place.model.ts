export class Place {
  public id: number;
  public name: string;
  public latitude: number;
  public longitude: number;
  public distance: string;
  constructor(
    id: number,
    name: string,
    latitude: number,
    longitude: number,
    distance: string
  ) {
    this.id = id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.distance = distance;
  }
}
