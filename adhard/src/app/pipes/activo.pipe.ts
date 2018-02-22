import { Pipe, PipeTransform } from '@angular/core';
import { debug } from 'util';

@Pipe({
  name: 'activo'
})
export class ActivoPipe implements PipeTransform {

  transform(items: any[], field: string, value: boolean): any {

    if (!items) {
      return [];
    }

    return items.filter(x => x[field] === value);
  }

}
