import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export interface Cat {
  name: string;
}

export interface Producto {
  nombre: string,
  precio: string,
  categoria: string
  srcImg: string;
  link: string;
}


@Injectable()
export class ApiService {

  // tslint:disable-next-line:no-inferrable-types
  url: string = 'http://localhost:2525/api/cats/';

  constructor(private _http: HttpClient) { }


  getAllCats(): Observable<Cat> {
    return this._http.get<Cat>(this.url);
  }

  getCat(name: string): Observable<Cat> {
    return this._http.get<Cat>(this.url + name);
  }
  

  insertCat(cat: Cat): Observable<Cat> {
    return this._http.post<Cat>(this.url, cat);
  }

  updateCat(cat: Cat): Observable<void> {
    return this._http.put<void>(this.url + cat.name , cat);
  }

  deleteCat(name: string) {
    return this._http.delete(this.url + name);
  }



  getItemsProductos() : Observable<Producto>{
    return this._http.get<Producto>("http://localhost:8084/api/compragamer/items");
  }


}
