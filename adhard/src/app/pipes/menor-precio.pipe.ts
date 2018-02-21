import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'menorPrecio'
})
export class MenorPrecioPipe implements PipeTransform {

  

  transform(value: any): any {


    return value;
  }

}
