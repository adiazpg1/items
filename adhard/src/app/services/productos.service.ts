import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Producto } from '../clases/productos';


@Injectable()
export class ProductosService {

   // tslint:disable-next-line:whitespace
   // tslint:disable-next-line:no-inferrable-types
    urlJson: string = './assets/data.json';

    resultadoProductos: Producto[] = [];

  constructor(private http: HttpClient) {
      console.log('Servicio inicializado');
  }

  cargarData() {
    return this.http.get(this.urlJson);
  }

  buscarData(busqueda: string) {
    return this.http.get(this.urlJson);
  }
}
