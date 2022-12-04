import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telephone'
})
export class TelephonePipe implements PipeTransform {
  transform(value: any, args?: any): string {

    return value.toString().replace(/^(\d{3})(\d{2})(\d{2})(\d{3})$/, '($1) $2 $3 $4');
  }
}
