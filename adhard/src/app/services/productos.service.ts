import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Producto } from '../clases/productos';


@Injectable()
export class ProductosService {

  // tslint:disable-next-line:whitespace
  // tslint:disable-next-line:no-inferrable-types
  urlJson: string = './assets/data.json';

  resultadoProductos: Producto[] = [];

  listaProcesadores: string[] = [];
  listaMotherboard: string[] = [];
  listaMemoriaRam: string[] = [];
  listaPlacaVideo: string[] = [];
  listaGabinetes: string[] = [];
  listaFuentes: string[] = [];


  constructor(private http: HttpClient) {
    this.listaProcesadores = ['I5 6500', 'I3 8350', 'I3 8100', 'I7 8700', 'I5 4440', '1300', '1400'];
    this.listaMotherboard = ['H270M', 'H110M', 'H81', 'B350', 'AX370'];
    this.listaMemoriaRam = ['4GB ', '8GB', '16GB', '32GB'];
    this.listaPlacaVideo = ['GT 730', 'GT 1030', 'GTX 1050', 'GTX 1050TI', 'GTX 1080', 'GTX 1060'];
    this.listaFuentes = ['400', '450', '500', '550', '600', '650'];
    this.listaGabinetes = ['Corsair', 'DeepCool', 'Nzxt'];
  }

  cargarData() {
    return this.http.get(this.urlJson);
  }

  actualizarLocalStorage(listaCarrito) {
    localStorage.setItem("data", JSON.stringify(listaCarrito));
  }

  cargarLocalStorage() {
    return  JSON.parse(localStorage.getItem("data"));
  }


}
