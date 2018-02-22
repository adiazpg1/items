import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'menorPrecio',
  pure: false
})
export class MenorPrecioPipe implements PipeTransform {



  transform(value: any): any {

  }

}
