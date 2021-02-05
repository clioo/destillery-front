import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let kms = parseFloat(value);
    kms = Math.round(kms * 1000) / 1000
    return kms.toString() + ' kms';
  }

}
