import { Pipe, PipeTransform } from '@angular/core';

const MAX_LENGTH_ALLOW = 9;
@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value.length < MAX_LENGTH_ALLOW) return value;
    let spaceLocation = value.indexOf(" ");
    if (spaceLocation === -1) return value.substring(0, 8)+"..."
    return value.split(" ")[0];
  }
}
