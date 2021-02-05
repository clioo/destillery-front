import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../../shared/data-storage.service";
import { Location } from "../../shared/interfaces/geolocation"
import { Laboratory } from "./laboratory.model";
import { LaboratoryService } from "./laboratory.service";

@Injectable({
  providedIn: 'root'
})
export class LaboratoryResolverService implements Resolve<Promise<Laboratory[]>> {
  constructor(private dataStorageService: DataStorageService,
    private laboratoryService: LaboratoryService) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Laboratory[]> {
    const hospitals = this.laboratoryService.getLaboratories();
    const latlng: Location = await this.dataStorageService.getLocation();
    if (hospitals.length === 0) {
      return this.dataStorageService.fetchLaboratories(latlng.latitude, latlng.longitude).toPromise();
    } else {
      return hospitals;
    }
  }
}