import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderFormater'
})
export class GenderFormaterPipe implements PipeTransform {

  transform(value: string): string {
    if(value == 'male')
      return "Férfi"
    else if(value == 'female')
      return "Nő"
    else
      return "Mindegy"
  }

}
