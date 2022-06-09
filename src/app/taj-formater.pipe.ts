import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tajFormater'
})
export class TajFormaterPipe implements PipeTransform {

  transform(value: number): string {
    return String(value).padStart(9, '0')
  }

}
